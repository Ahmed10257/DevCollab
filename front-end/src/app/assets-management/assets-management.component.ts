import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Asset, AssetFilter } from './models/asset.model';
import Swal from 'sweetalert2';
import { ViewAssetComponent } from './view-asset/view-asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';
import { AddQuantityComponent } from './add-quantity/add-quantity.component';

@Component({
  selector: 'app-assets-management',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ViewAssetComponent,
    AddAssetComponent,
    EditAssetComponent,
    AddQuantityComponent,
  ],
  templateUrl: './assets-management.component.html',
  styleUrl: './assets-management.component.css',
})
export class AssetsManagementComponent {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];

  // Search and filter
  searchTerm: string = '';
  typeFilter: string = '';

  // Advanced search
  showAdvancedSearch: boolean = false;
  advancedFilter: AssetFilter = {};

  // Modal states
  showViewModal: boolean = false;
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showAddQuantityModal: boolean = false;
  selectedAsset: Asset | null = null;

  // Types for dropdown
  types: string[] = [
    'Laptop',
    'Monitor',
    'Keyboard',
    'Mouse',
    'Switch',
    'Router',
    'Server',
    'Printer',
    'Other',
  ];
  locations: string[] = ['Office A', 'Office B', 'Warehouse', 'Remote'];
  owners: string[] = [
    'IT Department',
    'HR Department',
    'Finance',
    'Operations',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    // Mock data - replace with actual API call
    this.assets = [
      {
        id: 1,
        serial: 'LAP001',
        type: 'Laptop',
        name: 'Dell XPS 15',
        owner: 'John Doe',
        location: 'Office A',
        category: 'Hardware',
        quantity: 5,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-10'),
      },
      {
        id: 2,
        serial: 'MON002',
        type: 'Monitor',
        name: 'Samsung 27"',
        owner: 'Jane Smith',
        location: 'Office B',
        category: 'Hardware',
        quantity: 10,
        status: 'Active',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-15'),
      },
      {
        id: 3,
        serial: 'SWT001',
        type: 'Switch',
        name: 'Cisco Catalyst 2960',
        owner: 'IT Department',
        location: 'Office A',
        category: 'Hardware',
        quantity: 3,
        status: 'Active',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-20'),
      },
    ];
    this.filteredAssets = [...this.assets];
  }

  onSearch(): void {
    this.filteredAssets = this.assets.filter((asset) => {
      const matchesSearch =
        !this.searchTerm ||
        asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.serial.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.owner.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = !this.typeFilter || asset.type === this.typeFilter;

      return matchesSearch && matchesType;
    });
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  onAdvancedSearch(): void {
    this.filteredAssets = this.assets.filter((asset) => {
      const matchesType =
        !this.advancedFilter.type || asset.type === this.advancedFilter.type;
      const matchesOwner =
        !this.advancedFilter.ownedBy ||
        asset.owner === this.advancedFilter.ownedBy;
      const matchesLocation =
        !this.advancedFilter.location ||
        asset.location === this.advancedFilter.location;

      return matchesType && matchesOwner && matchesLocation;
    });
  }

  clearAdvancedSearch(): void {
    this.advancedFilter = {};
    this.filteredAssets = [...this.assets];
  }

  // Modal actions
  openAddModal(): void {
    this.showAddModal = true;
  }

  openViewModal(asset: Asset): void {
    this.selectedAsset = asset;
    this.showViewModal = true;
  }

  openEditModal(asset: Asset): void {
    this.selectedAsset = asset;
    this.showEditModal = true;
  }

  openAddQuantityModal(): void {
    this.showAddQuantityModal = true;
  }

  closeModals(): void {
    this.showViewModal = false;
    this.showAddModal = false;
    this.showEditModal = false;
    this.showAddQuantityModal = false;
    this.selectedAsset = null;
  }

  onAssetAdded(asset: Asset): void {
    // Add API call here
    const newAsset = {
      ...asset,
      id: this.assets.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.assets.push(newAsset);
    this.onSearch();
    this.closeModals();

    Swal.fire({
      icon: 'success',
      title: 'Asset Added!',
      text: `${asset.name} has been successfully added.`,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  onAssetUpdated(asset: Asset): void {
    // Add API call here
    const index = this.assets.findIndex((a) => a.id === asset.id);
    if (index !== -1) {
      this.assets[index] = { ...asset, updatedAt: new Date() };
      this.onSearch();
    }
    this.closeModals();

    Swal.fire({
      icon: 'success',
      title: 'Asset Updated!',
      text: `${asset.name} has been successfully updated.`,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  onQuantityAdded(data: { assetId: number; quantity: number }): void {
    // Add API call here
    const asset = this.assets.find((a) => a.id === data.assetId);
    if (asset) {
      asset.quantity = (asset.quantity || 0) + data.quantity;
      asset.updatedAt = new Date();
      this.onSearch();
    }
    this.closeModals();

    Swal.fire({
      icon: 'success',
      title: 'Quantity Added!',
      text: `${data.quantity} units have been added successfully.`,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  deleteAsset(asset: Asset): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${asset.name}? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Add API call here
        this.assets = this.assets.filter((a) => a.id !== asset.id);
        this.onSearch();

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${asset.name} has been deleted.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }
}
