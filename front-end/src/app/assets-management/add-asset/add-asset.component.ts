import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Asset, CreateAssetDto } from '../models/asset.model';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationData } from '../location-modal/location-modal.component';
import { AssetService } from '../services/asset.service';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { BranchService } from '../services/branch.service';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { RoomService } from '../services/room.service';
import { Branch } from '../models/branch.model';
import { Building } from '../models/building.model';
import { Floor } from '../models/floor.model';
import { Room } from '../models/room.model';
import Swal from 'sweetalert2';

interface GeneralData {
  // General Data
  categoryId: number | null;
  typeId: number | null;
  brand: string;
  model: string;

  // Location (hierarchical) - now using IDs
  branchId: number | null;
  buildingId: number | null;
  floorId: number | null;
  roomId: number | null;

  // Asset Info
  status: string;
  purchaseDate: string;
  warrantyExpiry: string;
  responsibleUserId: number | null;
  assignedUserId: number | null;
}

interface SpecificData {
  // Specific Data (per asset)
  serialNumber: string;
  notes: string;
  name: string;
}

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationModalComponent],
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Asset>();

  // Inject services
  private assetService = inject(AssetService);
  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  private branchService = inject(BranchService);
  private buildingService = inject(BuildingService);
  private floorService = inject(FloorService);
  private roomService = inject(RoomService);

  // General data (shared across all assets)
  generalData: GeneralData = {
    categoryId: null,
    typeId: null,
    brand: '',
    model: '',
    branchId: null,
    buildingId: null,
    floorId: null,
    roomId: null,
    status: 'Active',
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyExpiry: '',
    responsibleUserId: null,
    assignedUserId: null,
  };

  // Specific data for single asset
  specificData: SpecificData = {
    serialNumber: '',
    notes: '',
    name: '',
  };

  // Categories and Types from API
  categories: Category[] = [];
  availableTypes: Type[] = [];

  // Location data from API
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];

  // Status options
  statusOptions: string[] = ['Active', 'In Use', 'Maintenance', 'Retired', 'Storage'];

  isLoading = false;

  // Delivering companies
  deliveringCompanies: string[] = [
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Other',
  ];

  showLocationModal: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    forkJoin({
      categories: this.categoryService.getAll(),
      types: this.typeService.getAll(),
      branches: this.branchService.getAll(),
    }).subscribe({
      next: ({ categories, types, branches }) => {
        this.categories = categories;
        this.availableTypes = types;
        this.branches = branches;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        Swal.fire('Error', 'Failed to load form data', 'error');
        this.isLoading = false;
      },
    });
  }

  loadBranches(): void {
    this.isLoading = true;
    this.branchService.getAll().subscribe({
      next: (data) => {
        this.branches = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading branches:', error);
        this.isLoading = false;
      }
    });
  }

  // When category changes, update available types
  onCategoryChange(): void {
    this.generalData.typeId = null; // Reset type when category changes
    
    if (this.generalData.categoryId) {
      this.typeService.getAll(this.generalData.categoryId).subscribe({
        next: (types) => {
          this.availableTypes = types;
        },
        error: (error) => {
          console.error('Error loading types:', error);
          this.availableTypes = [];
        },
      });
    } else {
      this.availableTypes = [];
    }
  }

  onBranchChange(): void {
    this.generalData.buildingId = null;
    this.generalData.floorId = null;
    this.generalData.roomId = null;

    this.buildings = [];
    this.floors = [];
    this.rooms = [];

    if (this.generalData.branchId) {
      this.isLoading = true;
      this.buildingService.getByBranchId(this.generalData.branchId).subscribe({
        next: (data) => {
          this.buildings = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading buildings:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onBuildingChange(): void {
    this.generalData.floorId = null;
    this.generalData.roomId = null;

    this.floors = [];
    this.rooms = [];

    if (this.generalData.buildingId) {
      this.isLoading = true;
      this.floorService.getByBuildingId(this.generalData.buildingId).subscribe({
        next: (data) => {
          this.floors = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading floors:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onFloorChange(): void {
    this.generalData.roomId = null;

    this.rooms = [];

    if (this.generalData.floorId) {
      this.isLoading = true;
      this.roomService.getByFloorId(this.generalData.floorId).subscribe({
        next: (data) => {
          this.rooms = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading rooms:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    // Validate required fields
    if (!this.generalData.categoryId || !this.generalData.typeId) {
      Swal.fire('Validation Error', 'Please select category and type', 'error');
      return;
    }

    if (!this.specificData.name || !this.specificData.serialNumber) {
      Swal.fire('Validation Error', 'Please enter asset name and serial number', 'error');
      return;
    }

    // Create asset DTO
    const createDto: CreateAssetDto = {
      name: this.specificData.name,
      categoryId: this.generalData.categoryId,
      typeId: this.generalData.typeId,
      serialNumber: this.specificData.serialNumber,
      brand: this.generalData.brand || undefined,
      model: this.generalData.model || undefined,
      branchId: this.generalData.branchId || undefined,
      buildingId: this.generalData.buildingId || undefined,
      floorId: this.generalData.floorId || undefined,
      roomId: this.generalData.roomId || undefined,
      status: this.generalData.status,
      purchaseDate: this.generalData.purchaseDate || undefined,
      warrantyExpiry: this.generalData.warrantyExpiry || undefined,
      responsibleUserId: this.generalData.responsibleUserId || undefined,
      assignedUserId: this.generalData.assignedUserId || undefined,
      notes: this.specificData.notes || undefined,
    };

    // Call API to create asset
    this.isLoading = true;
    this.assetService.create(createDto).subscribe({
      next: (asset) => {
        this.isLoading = false;
        Swal.fire('Success', 'Asset created successfully', 'success');
        this.save.emit(asset);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating asset:', error);
        Swal.fire('Error', 'Failed to create asset', 'error');
      },
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
  // Location Modal Handlers
  // Add methods
  openLocationModal() {
    this.showLocationModal = true;
  }

  onLocationSaved(locationData: LocationData) {
    console.log('New location added:', locationData);
    // Handle the new location (e.g., add to your branches/buildings/floors/rooms arrays)
    this.showLocationModal = false;
  }

  onLocationModalClose() {
    this.showLocationModal = false;
  }
}
