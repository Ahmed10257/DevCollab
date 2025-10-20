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
import { Asset, CreateAssetDto } from '../models/asset.model';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { AssetService } from '../services/asset.service';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { BranchService } from '../services/branch.service';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { RoomService } from '../services/room.service';
import { ManufacturerService } from '../services/manufacturer.service';
import { ModelService } from '../services/model.service';
import { Branch } from '../models/branch.model';
import { Building } from '../models/building.model';
import { Floor } from '../models/floor.model';
import { Room } from '../models/room.model';
import { Manufacturer } from '../models/manufacturer.model';
import { Model } from '../models/model.model';
import Swal from 'sweetalert2';

interface GeneralData {
  // General Data
  categoryId: number | null;
  typeId: number | null;
  manufacturerId: number | null;
  modelId: number | null;

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

// Category-specific data based on asset type
interface CategorySpecificData {
  [key: string]: any; // Allow dynamic field access

  // Networking Devices
  networkingIpAddress?: string;
  macAddress?: string;
  networkType?: string;

  // Computers
  cpu?: string;
  cpuCores?: number;
  ram?: string;
  storageType?: string;
  storageCapacity?: string;
  gpu?: string;
  osType?: string;
  osVersion?: string;

  // Servers
  serverType?: string;
  powerSupply?: string;
  serverIpAddress?: string;
  dnsName?: string;
  virtualizationSupport?: boolean;

  // Racks
  rackType?: string;
  rackHeight?: string;
  rackWidth?: string;
  rackDepth?: string;
  maxLoadCapacity?: string;
  coolingCapacity?: string;

  // Printers
  printerType?: string;
  printTechnology?: string;
  colorCapability?: boolean;
  maxPrintSpeed?: string;
  printResolution?: string;
  networked?: boolean;

  // Projectors
  projectorType?: string;
  brightness?: string;
  projectorResolution?: string;
  lampHours?: number;
  hasInteractivity?: boolean;

  // Cameras
  cameraType?: string;
  megapixels?: string;
  infraredRange?: string;
  waterproof?: boolean;

  // IP Phones
  phoneType?: string;
  lines?: number;
  codec?: string;
  extensionNumber?: string;
}

interface SpecificData {
  // Specific Data (per asset)
  serialNumber: string;
  notes: string;
  name: string;
  categorySpecificData: CategorySpecificData;
}

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  private manufacturerService = inject(ManufacturerService);
  private modelService = inject(ModelService);

  // General data (shared across all assets)
  generalData: GeneralData = {
    categoryId: null,
    typeId: null,
    manufacturerId: null,
    modelId: null,
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
    categorySpecificData: {},
  };

  // Array for managing multiple assets
  specificDataList: SpecificData[] = [
    {
      serialNumber: '',
      notes: '',
      name: '',
      categorySpecificData: {},
    },
  ];

  // Categories and Types from API
  categories: Category[] = [];
  availableTypes: Type[] = [];
  manufacturers: Manufacturer[] = [];
  availableModels: Model[] = [];

  // Category tracking
  currentCategory: string = '';
  currentCategoryId: number | null = null;
  categoryMappings: { [key: string]: Category } = {};

  // Location data from API
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];

  // Status options
  statusOptions: string[] = [
    'Active',
    'In Use',
    'Maintenance',
    'Retired',
    'Storage',
  ];

  isLoading = false;

  // Category-specific fields to display
  categorySpecificFields: { [key: number]: string[] } = {
    1: ['networkingIpAddress', 'macAddress', 'networkType'], // Networking Devices
    2: [
      'cpu',
      'cpuCores',
      'ram',
      'storageType',
      'storageCapacity',
      'gpu',
      'osType',
      'osVersion',
    ], // Computers
    7: [
      'serverType',
      'cpu',
      'cpuCores',
      'ram',
      'powerSupply',
      'serverIpAddress',
      'dnsName',
      'virtualizationSupport',
    ], // Servers
    8: [
      'rackType',
      'rackHeight',
      'rackWidth',
      'rackDepth',
      'maxLoadCapacity',
      'coolingCapacity',
    ], // Racks
    9: [
      'printerType',
      'printTechnology',
      'colorCapability',
      'maxPrintSpeed',
      'printResolution',
      'networked',
    ], // Printers
    10: [
      'projectorType',
      'brightness',
      'projectorResolution',
      'lampHours',
      'hasInteractivity',
    ], // Projectors
    11: ['cameraType', 'megapixels', 'infraredRange', 'waterproof'], // Cameras
    12: ['phoneType', 'lines', 'codec', 'extensionNumber'], // IP Phones
  };

  // Field labels for display
  fieldLabels: { [key: string]: string } = {
    networkingIpAddress: 'IP Address',
    macAddress: 'MAC Address',
    networkType: 'Network Type',
    cpu: 'CPU',
    cpuCores: 'CPU Cores',
    ram: 'RAM',
    storageType: 'Storage Type',
    storageCapacity: 'Storage Capacity',
    gpu: 'GPU',
    osType: 'OS Type',
    osVersion: 'OS Version',
    serverType: 'Server Type',
    powerSupply: 'Power Supply',
    serverIpAddress: 'IP Address',
    dnsName: 'DNS Name',
    virtualizationSupport: 'Virtualization Support',
    rackType: 'Rack Type',
    rackHeight: 'Rack Height',
    rackWidth: 'Rack Width',
    rackDepth: 'Rack Depth',
    maxLoadCapacity: 'Max Load Capacity',
    coolingCapacity: 'Cooling Capacity',
    printerType: 'Printer Type',
    printTechnology: 'Print Technology',
    colorCapability: 'Color Capability',
    maxPrintSpeed: 'Max Print Speed',
    printResolution: 'Resolution',
    networked: 'Networked',
    projectorType: 'Projector Type',
    brightness: 'Brightness',
    projectorResolution: 'Resolution',
    lampHours: 'Lamp Hours',
    hasInteractivity: 'Has Interactivity',
    cameraType: 'Camera Type',
    megapixels: 'Megapixels',
    infraredRange: 'Infrared Range',
    waterproof: 'Waterproof',
    phoneType: 'Phone Type',
    lines: 'Number of Lines',
    codec: 'Codec',
    extensionNumber: 'Extension Number',
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    forkJoin({
      categories: this.categoryService.getAll(),
      types: this.typeService.getAll(),
      branches: this.branchService.getAll(),
      manufacturers: this.manufacturerService.getAll(),
    }).subscribe({
      next: ({ categories, types, branches, manufacturers }) => {
        this.categories = categories;
        this.availableTypes = types;
        this.branches = branches;
        this.manufacturers = manufacturers;

        // Build category mappings
        this.categoryMappings = {};
        categories.forEach((cat) => {
          this.categoryMappings[cat.name] = cat;
        });

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
      },
    });
  }

  // When category changes, update available types
  onCategoryChange(): void {
    this.generalData.typeId = null; // Reset type when category changes
    this.generalData.manufacturerId = null; // Reset manufacturer
    this.generalData.modelId = null; // Reset model
    this.availableModels = [];

    if (this.generalData.categoryId) {
      const category = this.categories.find(
        (c) => c.id === this.generalData.categoryId
      );
      if (category) {
        this.currentCategory = category.name;
        this.currentCategoryId = category.id;
      }

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
      this.currentCategory = '';
      this.currentCategoryId = null;
    }
  }

  onManufacturerChange(): void {
    this.generalData.modelId = null;
    this.availableModels = [];

    if (this.generalData.manufacturerId) {
      this.modelService.getAll(this.generalData.manufacturerId).subscribe({
        next: (models) => {
          this.availableModels = models;
        },
        error: (error) => {
          console.error('Error loading models:', error);
          this.availableModels = [];
        },
      });
    }
  }

  // Get category-specific fields to display based on current category
  getSpecificFields(): string[] {
    if (
      this.currentCategoryId &&
      this.categorySpecificFields[this.currentCategoryId]
    ) {
      return this.categorySpecificFields[this.currentCategoryId];
    }
    return [];
  }

  // Get field type for input (text, number, checkbox, etc.)
  getFieldType(fieldName: string): string {
    const booleanFields = [
      'virtualizationSupport',
      'colorCapability',
      'networked',
      'hasInteractivity',
      'waterproof',
    ];
    if (booleanFields.includes(fieldName)) {
      return 'checkbox';
    }
    if (
      fieldName === 'cpuCores' ||
      fieldName === 'lines' ||
      fieldName === 'lampHours'
    ) {
      return 'number';
    }
    return 'text';
  }

  getFieldLabel(fieldName: string): string {
    return this.fieldLabels[fieldName] || fieldName;
  }

  addNewSpecificData(): void {
    this.specificDataList.push({
      serialNumber: '',
      notes: '',
      name: '',
      categorySpecificData: {},
    });
  }

  removeSpecificData(index: number): void {
    if (this.specificDataList.length > 1) {
      this.specificDataList.splice(index, 1);
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
        },
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
        },
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
      !this.generalData.categoryId ||
      !this.generalData.typeId ||
      !this.generalData.manufacturerId ||
      !this.generalData.modelId
    ) {
      Swal.fire(
        'Validation Error',
        'Please select category, type, manufacturer, and model',
        'error'
      );
      return;
    }

    if (!this.specificData.name || !this.specificData.serialNumber) {
      Swal.fire(
        'Validation Error',
        'Please enter asset name and serial number',
        'error'
      );
      return;
    }

    // Create asset DTO
    const createDto: CreateAssetDto = {
      name: this.specificData.name,
      categoryId: this.generalData.categoryId,
      typeId: this.generalData.typeId,
      manufacturerId: this.generalData.manufacturerId,
      modelId: this.generalData.modelId,
      serialNumber: this.specificData.serialNumber,
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
}
