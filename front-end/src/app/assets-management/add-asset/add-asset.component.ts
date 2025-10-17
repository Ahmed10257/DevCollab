import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../models/asset.model';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationData } from '../location-modal/location-modal.component';

interface GeneralData {
  // General Data
  network: string;
  type: string;
  brand: string;
  model: string;

  // Location (hierarchical)
  branch: string;
  building: string;
  floor: string;
  room: string;

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

  // General data (shared across all assets)
  generalData: GeneralData = {
    network: '',
    type: '',
    brand: '',
    model: '',
    branch: '',
    building: '',
    floor: '',
    room: '',
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

  // Location hierarchies
  branches: string[] = ['Main Branch', 'Branch A', 'Branch B', 'Branch C'];
  buildings: string[] = [];
  floors: string[] = [];
  rooms: string[] = [];

  // Building options for each branch
  buildingsMap: { [key: string]: string[] } = {
    'Main Branch': ['Building 1', 'Building 2', 'Building 3'],
    'Branch A': ['Building A1', 'Building A2'],
    'Branch B': ['Building B1'],
    'Branch C': ['Building C1', 'Building C2'],
  };

  // Floor options (dynamic based on building)
  floorsMap: { [key: string]: string[] } = {
    'Building 1': ['Ground Floor', 'Floor 1', 'Floor 2', 'Floor 3'],
    'Building 2': ['Ground Floor', 'Floor 1', 'Floor 2'],
    'Building 3': ['Ground Floor', 'Floor 1'],
    'Building A1': ['Ground Floor', 'Floor 1', 'Floor 2'],
    'Building A2': ['Ground Floor', 'Floor 1'],
    'Building B1': ['Ground Floor'],
    'Building C1': ['Ground Floor', 'Floor 1'],
    'Building C2': ['Ground Floor'],
  };

  // Room options (dynamic based on floor)
  roomsMap: { [key: string]: string[] } = {
    'Ground Floor': ['Room 101', 'Room 102', 'Room 103', 'Room 104'],
    'Floor 1': ['Room 201', 'Room 202', 'Room 203', 'Room 204'],
    'Floor 2': ['Room 301', 'Room 302', 'Room 303', 'Room 304'],
    'Floor 3': ['Room 401', 'Room 402', 'Room 403', 'Room 404'],
  };

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

    // Set default network if category is provided
    if (this.currentCategory && this.categoryMappings[this.currentCategory]) {
      const categoryName = this.categoryMappings[this.currentCategory].name;
      this.generalData.network = categoryName;
      this.onNetworkChange();
    }
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
    this.generalData.building = '';
    this.generalData.floor = '';
    this.generalData.room = '';

    this.buildings = this.buildingsMap[this.generalData.branch] || [];
    this.floors = [];
    this.rooms = [];
  }

  onBuildingChange(): void {
    this.generalData.floor = '';
    this.generalData.room = '';

    this.floors = this.floorsMap[this.generalData.building] || [];
    this.rooms = [];
  }

  onFloorChange(): void {
    this.generalData.room = '';

    this.rooms = this.roomsMap[this.generalData.floor] || [];
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    // Convert to Asset format - combine general data with each specific data
    const convertedAssets: Asset[] = this.specificDataList.map((specificData) => ({
      serial: specificData.serial,
      type: this.generalData.type,
      name: `${this.generalData.brand} ${this.generalData.model}`.trim(),
      owner: this.generalData.deliveringCompany,
      location: `${this.generalData.branch} - ${this.generalData.building} - ${this.generalData.floor} - ${this.generalData.room}`,
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
