import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../models/asset.model';

interface AssetForm {
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

  // Specific Data
  serial: string;
  note: string;
}

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent implements OnInit {
  @Input() currentCategory: string = '';
  @Input() categoryMappings: any = {};
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Asset[]>();

  // Multiple assets support
  assets: AssetForm[] = [];

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

  ngOnInit(): void {
    // Initialize with one empty asset form
    this.addNewAssetForm();

    // Set default network if category is provided
    if (this.currentCategory && this.categoryMappings[this.currentCategory]) {
      const categoryName = this.categoryMappings[this.currentCategory].name;
      this.assets[0].network = categoryName;
      this.onNetworkChange(0);
    }
  }

  addNewAssetForm(): void {
    const newAsset: AssetForm = {
      network: this.currentCategory
        ? this.categoryMappings[this.currentCategory]?.name || ''
        : '',
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
      serial: '',
      note: '',
    };
    this.assets.push(newAsset);

    // Set available types if network is already selected
    if (newAsset.network) {
      const categoryKey = this.getCategoryKeyFromName(newAsset.network);
      if (categoryKey && this.categoryMappings[categoryKey]) {
        this.availableTypes = this.categoryMappings[categoryKey].types || [];
      }
    }
  }

  removeAssetForm(index: number): void {
    if (this.assets.length > 1) {
      this.assets.splice(index, 1);
    }
  }

  onNetworkChange(index: number): void {
    const asset = this.assets[index];
    asset.type = ''; // Reset type when network changes

    // Find the category key from the network name
    const categoryKey = this.getCategoryKeyFromName(asset.network);

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

  onBranchChange(index: number): void {
    const asset = this.assets[index];
    asset.building = '';
    asset.floor = '';
    asset.room = '';

    this.buildings = this.buildingsMap[asset.branch] || [];
    this.floors = [];
    this.rooms = [];
  }

  onBuildingChange(index: number): void {
    const asset = this.assets[index];
    asset.floor = '';
    asset.room = '';

    this.floors = this.floorsMap[asset.building] || [];
    this.rooms = [];
  }

  onFloorChange(index: number): void {
    const asset = this.assets[index];
    asset.room = '';

    this.rooms = this.roomsMap[asset.floor] || [];
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    // Convert AssetForm to Asset format
    const convertedAssets: Asset[] = this.assets.map((assetForm) => ({
      serial: assetForm.serial,
      type: assetForm.type,
      name: `${assetForm.brand} ${assetForm.model}`.trim(),
      owner: assetForm.deliveringCompany,
      location: `${assetForm.branch} - ${assetForm.building} - ${assetForm.floor} - ${assetForm.room}`,
      category: assetForm.network,
      quantity: 1,
      status: 'Active',
      note: assetForm.note,
      brand: assetForm.brand,
      model: assetForm.model,
      deliveringDate: assetForm.deliveringDate,
    }));

    this.save.emit(convertedAssets);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
