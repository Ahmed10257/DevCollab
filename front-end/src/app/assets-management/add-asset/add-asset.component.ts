import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../models/asset.model';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationData } from '../location-modal/location-modal.component';
import { BranchService } from '../services/branch.service';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { RoomService } from '../services/room.service';
import { Branch } from '../models/branch.model';
import { Building } from '../models/building.model';
import { Floor } from '../models/floor.model';
import { Room } from '../models/room.model';

interface GeneralData {
  // General Data
  network: string;
  type: string;
  brand: string;
  model: string;

  // Location (hierarchical) - now using IDs
  branchId: number | null;
  buildingId: number | null;
  floorId: number | null;
  roomId: number | null;

  // Delivering Info
  todaysDate: Date;
  deliveringDate: Date;
  deliveringCompany: string;
}

interface SpecificData {
  // Specific Data (per asset)
  serial: string;
  note: string;
}

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationModalComponent],
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent implements OnInit {
  @Input() currentCategory: string = '';
  @Input() categoryMappings: any = {};
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Asset[]>();

  // Inject location services
  private branchService = inject(BranchService);
  private buildingService = inject(BuildingService);
  private floorService = inject(FloorService);
  private roomService = inject(RoomService);

  // General data (shared across all assets)
  generalData: GeneralData = {
    network: '',
    type: '',
    brand: '',
    model: '',
    branchId: null,
    buildingId: null,
    floorId: null,
    roomId: null,
    todaysDate: new Date(),
    deliveringDate: new Date(),
    deliveringCompany: '',
  };

  // Multiple specific data (one per asset)
  specificDataList: SpecificData[] = [];

  // Categories (Networks)
  networks: string[] = [
    'Networking',
    'Computers',
    'Servers',
    'Storage',
    'Printers',
    'Phones',
    'Accessories',
    'Others',
  ];

  // Types based on selected network
  availableTypes: string[] = [];

  // Location data from API
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];

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
    // Initialize with one empty specific data form
    this.addNewSpecificData();

    // Load branches from API
    this.loadBranches();

    // Set default network if category is provided
    if (this.currentCategory && this.categoryMappings[this.currentCategory]) {
      const categoryName = this.categoryMappings[this.currentCategory].name;
      this.generalData.network = categoryName;
      this.onNetworkChange();
    }
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

  addNewSpecificData(): void {
    const newSpecificData: SpecificData = {
      serial: '',
      note: '',
    };
    this.specificDataList.push(newSpecificData);
  }

  removeSpecificData(index: number): void {
    if (this.specificDataList.length > 1) {
      this.specificDataList.splice(index, 1);
    }
  }

  onNetworkChange(): void {
    this.generalData.type = ''; // Reset type when network changes

    // Find the category key from the network name
    const categoryKey = this.getCategoryKeyFromName(this.generalData.network);

    if (categoryKey && this.categoryMappings[categoryKey]) {
      this.availableTypes = this.categoryMappings[categoryKey].types || [];
    } else {
      this.availableTypes = [];
    }
  }

  getCategoryKeyFromName(networkName: string): string | null {
    for (const [key, value] of Object.entries(this.categoryMappings)) {
      if ((value as any).name === networkName) {
        return key;
      }
    }
    return null;
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
    // Get location names from IDs
    const branchName = this.branches.find(b => b.id === this.generalData.branchId)?.name || '';
    const buildingName = this.buildings.find(b => b.id === this.generalData.buildingId)?.name || '';
    const floorName = this.floors.find(f => f.id === this.generalData.floorId)?.name || '';
    const roomName = this.rooms.find(r => r.id === this.generalData.roomId)?.name || '';

    // Convert to Asset format - combine general data with each specific data
    const convertedAssets: Asset[] = this.specificDataList.map((specificData) => ({
      serial: specificData.serial,
      type: this.generalData.type,
      name: `${this.generalData.brand} ${this.generalData.model}`.trim(),
      owner: this.generalData.deliveringCompany,
      location: `${branchName} - ${buildingName} - ${floorName} - ${roomName}`,
      category: this.generalData.network,
      quantity: 1,
      status: 'Active',
      note: specificData.note,
      brand: this.generalData.brand,
      model: this.generalData.model,
      deliveringDate: this.generalData.deliveringDate,
    }));

    this.save.emit(convertedAssets);
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
