import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Asset, UpdateAssetDto } from '../models/asset.model';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { Branch } from '../models/branch.model';
import { Building } from '../models/building.model';
import { Floor } from '../models/floor.model';
import { Room } from '../models/room.model';
import { AssetService } from '../services/asset.service';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { BranchService } from '../services/branch.service';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { RoomService } from '../services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css'],
})
export class EditAssetComponent implements OnInit {
  @Input() asset!: Asset;
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

  editedAsset!: Asset;

  // Data from API
  categories: Category[] = [];
  availableTypes: Type[] = [];
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];

  // Status options
  statuses: string[] = [
    'Active',
    'In Use',
    'Maintenance',
    'Retired',
    'Storage',
  ];

  isLoading = false;

  ngOnInit(): void {
    // Create a copy of the asset to edit
    this.editedAsset = { ...this.asset };
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
        this.availableTypes = types.filter(
          (t) => t.categoryId === this.editedAsset.categoryId
        );
        this.branches = branches;

        // Load location hierarchy based on current asset
        if (this.editedAsset.branchId) {
          this.onBranchChange();
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        Swal.fire('Error', 'Failed to load form data', 'error');
        this.isLoading = false;
      },
    });
  }

  onCategoryChange(): void {
    this.editedAsset.typeId = undefined as any;

    if (this.editedAsset.categoryId) {
      this.typeService.getAll(this.editedAsset.categoryId).subscribe({
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
    this.editedAsset.buildingId = undefined;
    this.editedAsset.floorId = undefined;
    this.editedAsset.roomId = undefined;
    this.buildings = [];
    this.floors = [];
    this.rooms = [];

    if (this.editedAsset.branchId) {
      this.buildingService.getAll(this.editedAsset.branchId).subscribe({
        next: (data) => {
          this.buildings = data;
        },
        error: (error) => {
          console.error('Error loading buildings:', error);
        },
      });
    }
  }

  onBuildingChange(): void {
    this.editedAsset.floorId = undefined;
    this.editedAsset.roomId = undefined;
    this.floors = [];
    this.rooms = [];

    if (this.editedAsset.buildingId) {
      this.floorService.getAll(this.editedAsset.buildingId).subscribe({
        next: (data) => {
          this.floors = data;
        },
        error: (error) => {
          console.error('Error loading floors:', error);
        },
      });
    }
  }

  onFloorChange(): void {
    this.editedAsset.roomId = undefined;
    this.rooms = [];

    if (this.editedAsset.floorId) {
      this.roomService.getAll(this.editedAsset.floorId).subscribe({
        next: (data) => {
          this.rooms = data;
        },
        error: (error) => {
          console.error('Error loading rooms:', error);
        },
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    // Validate required fields
    if (
      !this.editedAsset.name ||
      !this.editedAsset.categoryId ||
      !this.editedAsset.typeId ||
      !this.editedAsset.serialNumber
    ) {
      Swal.fire(
        'Validation Error',
        'Please fill in all required fields',
        'error'
      );
      return;
    }

    // Create update DTO
    const updateDto: UpdateAssetDto = {
      name: this.editedAsset.name,
      categoryId: this.editedAsset.categoryId,
      typeId: this.editedAsset.typeId,
      serialNumber: this.editedAsset.serialNumber,
      manufacturerId: this.editedAsset.manufacturerId || undefined,
      modelId: this.editedAsset.modelId || undefined,
      branchId: this.editedAsset.branchId || undefined,
      buildingId: this.editedAsset.buildingId || undefined,
      floorId: this.editedAsset.floorId || undefined,
      roomId: this.editedAsset.roomId || undefined,
      status: this.editedAsset.status,
      purchaseDate: this.editedAsset.purchaseDate || undefined,
      warrantyExpiry: this.editedAsset.warrantyExpiry || undefined,
      responsibleUserId: this.editedAsset.responsibleUserId || undefined,
      assignedUserId: this.editedAsset.assignedUserId || undefined,
      notes: this.editedAsset.notes || undefined,
    };

    // Call API to update asset
    this.isLoading = true;
    this.assetService.update(this.editedAsset.id, updateDto).subscribe({
      next: (asset) => {
        this.isLoading = false;
        Swal.fire('Success', 'Asset updated successfully', 'success');
        this.save.emit(asset);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating asset:', error);
        Swal.fire('Error', 'Failed to update asset', 'error');
      },
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
