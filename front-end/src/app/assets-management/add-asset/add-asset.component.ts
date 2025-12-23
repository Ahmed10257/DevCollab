import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Asset, CreateAssetDto } from '../models/asset.model';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { Manufacturer } from '../models/manufacturer.model';
import { Model } from '../models/model.model';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationData } from '../location-modal/location-modal.component';
import { AssetService } from '../services/asset.service';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { ManufacturerService } from '../services/manufacturer.service';
import { ModelService } from '../services/model.service';
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

  // Optional fields used in template
  todaysDate?: string;
  deliveringDate?: string;
  deliveringCompany?: string;
}

interface SpecificData {
  // Specific Data (per asset)
  serialNumber: string;
  notes: string;
  name: string;
  // Type-specific fields
  [key: string]: any;
}

// Type-specific field configurations
interface TypeFieldConfig {
  typeId?: number;
  typeName?: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'textarea' | 'select';
    required: boolean;
    options?: { value: string; label: string }[];
    placeholder?: string;
  }[];
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
  private manufacturerService = inject(ManufacturerService);
  private modelService = inject(ModelService);
  private branchService = inject(BranchService);
  private buildingService = inject(BuildingService);
  private floorService = inject(FloorService);
  private roomService = inject(RoomService);

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
  };

  // Array for managing multiple assets
  specificDataList: SpecificData[] = [
    {
      serialNumber: '',
      notes: '',
      name: '',
    }
  ];

  // Categories and Types from API
  categories: Category[] = [];
  availableTypes: Type[] = [];
  allManufacturers: Manufacturer[] = [];
  filteredManufacturers: Manufacturer[] = [];
  allModels: Model[] = [];
  filteredModels: Model[] = [];

  // Category tracking
  currentCategory: string = '';
  categoryMappings: { [key: string]: Category } = {};

  // Location data from API
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];

  // Status options
  statusOptions: string[] = ['Active', 'In Use', 'Maintenance', 'Retired', 'Storage'];

  // Type-specific field configurations
  typeFieldConfigs: { [key: string]: TypeFieldConfig } = {};

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
      manufacturers: this.manufacturerService.getAll(),
      models: this.modelService.getAll(),
      branches: this.branchService.getAll(),
    }).subscribe({
      next: ({ categories, types, manufacturers, models, branches }) => {
        this.categories = categories;
        this.availableTypes = types;
        this.allManufacturers = manufacturers;
        this.allModels = models;
        this.branches = branches;
        
        // Build category mappings
        this.categoryMappings = {};
        categories.forEach(cat => {
          this.categoryMappings[cat.name] = cat;
        });

        // Initialize type-specific field configurations
        this.initializeTypeFieldConfigs();
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        Swal.fire('Error', 'Failed to load form data', 'error');
        this.isLoading = false;
      },
    });
  }

  private initializeTypeFieldConfigs(): void {
    // Define specific fields for each type/category
    // These are sample configurations - adjust based on your actual types
    
    // Computers
    this.typeFieldConfigs['Computers'] = {
      typeName: 'Computers',
      fields: [
        { name: 'cpu', label: 'Processor (CPU)', type: 'text', required: false, placeholder: 'e.g., Intel i7' },
        { name: 'ram', label: 'RAM (GB)', type: 'number', required: false, placeholder: 'e.g., 16' },
        { name: 'storageType', label: 'Storage Type', type: 'select', required: false, options: [
          { value: 'SSD', label: 'SSD' },
          { value: 'HDD', label: 'HDD' },
          { value: 'NVMe', label: 'NVMe' }
        ]},
        { name: 'storageCapacity', label: 'Storage (GB)', type: 'number', required: false, placeholder: 'e.g., 512' },
        { name: 'osType', label: 'Operating System', type: 'text', required: false, placeholder: 'e.g., Windows 11 Pro' }
      ]
    };

    // Networking Devices
    this.typeFieldConfigs['Networking'] = {
      typeName: 'Networking',
      fields: [
        { name: 'ipAddress', label: 'IP Address', type: 'text', required: false, placeholder: '192.168.1.1' },
        { name: 'macAddress', label: 'MAC Address', type: 'text', required: false, placeholder: '00:1A:2B:3C:4D:5E' },
        { name: 'portCount', label: 'Number of Ports', type: 'number', required: false },
        { name: 'bandwidth', label: 'Bandwidth (Gbps)', type: 'number', required: false, placeholder: 'e.g., 1 or 10' }
      ]
    };

    // Servers
    this.typeFieldConfigs['Servers'] = {
      typeName: 'Servers',
      fields: [
        { name: 'cpu', label: 'Processor (CPU)', type: 'text', required: false, placeholder: 'e.g., Xeon E5' },
        { name: 'ram', label: 'RAM (GB)', type: 'number', required: false, placeholder: 'e.g., 64' },
        { name: 'storageType', label: 'Storage Type', type: 'select', required: false, options: [
          { value: 'SSD', label: 'SSD' },
          { value: 'HDD', label: 'HDD' },
          { value: 'NVMe', label: 'NVMe' }
        ]},
        { name: 'storageCapacity', label: 'Storage (TB)', type: 'number', required: false, placeholder: 'e.g., 2' },
        { name: 'redundancy', label: 'Redundancy Type', type: 'text', required: false, placeholder: 'e.g., RAID 6' }
      ]
    };

    // Printers
    this.typeFieldConfigs['Printers'] = {
      typeName: 'Printers',
      fields: [
        { name: 'printerType', label: 'Printer Type', type: 'select', required: false, options: [
          { value: 'Laser', label: 'Laser' },
          { value: 'Inkjet', label: 'Inkjet' },
          { value: 'Thermal', label: 'Thermal' }
        ]},
        { name: 'colorCapable', label: 'Color Capable', type: 'select', required: false, options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ]},
        { name: 'ppm', label: 'Pages Per Minute (PPM)', type: 'number', required: false },
        { name: 'networkEnabled', label: 'Network Enabled', type: 'select', required: false, options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ]},
        { name: 'tonerModel', label: 'Toner/Ink Model', type: 'text', required: false }
      ]
    };

    // IP Phones
    this.typeFieldConfigs['IP Phones'] = {
      typeName: 'IP Phones',
      fields: [
        { name: 'sipSupport', label: 'SIP Support', type: 'select', required: false, options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ]},
        { name: 'displayType', label: 'Display Type', type: 'text', required: false, placeholder: 'e.g., Color LCD' },
        { name: 'ports', label: 'Number of Ports', type: 'number', required: false }
      ]
    };

    // Cameras
    this.typeFieldConfigs['Cameras'] = {
      typeName: 'Cameras',
      fields: [
        { name: 'sensorType', label: 'Sensor Type', type: 'text', required: false, placeholder: 'e.g., CMOS' },
        { name: 'megapixels', label: 'Megapixels', type: 'number', required: false },
        { name: 'resolution', label: 'Resolution', type: 'text', required: false, placeholder: 'e.g., 1920x1080' },
        { name: 'lensType', label: 'Lens Type', type: 'text', required: false, placeholder: 'e.g., Fixed or Varifocal' }
      ]
    };

    // Projectors
    this.typeFieldConfigs['Projectors'] = {
      typeName: 'Projectors',
      fields: [
        { name: 'brightness', label: 'Brightness (Lumens)', type: 'number', required: false },
        { name: 'resolution', label: 'Resolution', type: 'text', required: false, placeholder: 'e.g., 1080p or 4K' },
        { name: 'lensType', label: 'Lens Type', type: 'text', required: false, placeholder: 'e.g., Standard' },
        { name: 'connectivity', label: 'Connectivity', type: 'text', required: false, placeholder: 'e.g., HDMI, VGA' }
      ]
    };
  }

  getTypeSpecificFields(): TypeFieldConfig | null {
    if (!this.generalData.typeId) return null;
    
    const selectedType = this.availableTypes.find(t => t.id === this.generalData.typeId);
    if (!selectedType) return null;

    // Try to find config by exact type name
    let config = this.typeFieldConfigs[selectedType.name];
    
    // If not found, try to match by checking if type name includes common keywords
    if (!config) {
      const typeNameLower = selectedType.name.toLowerCase();
      for (const [key, value] of Object.entries(this.typeFieldConfigs)) {
        if (typeNameLower.includes(key.toLowerCase())) {
          config = value;
          break;
        }
      }
    }

    return config || null;
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
      const category = this.categories.find(c => c.id === this.generalData.categoryId);
      if (category) {
        this.currentCategory = category.name;
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
    }
  }

  onNetworkChange(): void {
    // Reset manufacturer and model when type changes
    this.generalData.manufacturerId = null;
    this.generalData.modelId = null;
    this.filteredManufacturers = [];
    this.filteredModels = [];
    
    if (this.generalData.typeId) {
      const selectedType = this.availableTypes.find(t => t.id === this.generalData.typeId);
      if (selectedType) {
        // For now, show all manufacturers. In future, you might want to filter by type
        this.filteredManufacturers = this.allManufacturers;
      }
    }
  }

  onManufacturerChange(): void {
    // Reset model when manufacturer changes
    this.generalData.modelId = null;
    this.filteredModels = [];
    
    if (this.generalData.manufacturerId) {
      // Filter models by selected manufacturer
      this.filteredModels = this.allModels.filter(
        m => m.manufacturerId === this.generalData.manufacturerId
      );
    }
  }

  addNewSpecificData(): void {
    this.specificDataList.push({
      serialNumber: '',
      notes: '',
      name: '',
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
      manufacturerId: this.generalData.manufacturerId || undefined,
      modelId: this.generalData.modelId || undefined,
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
