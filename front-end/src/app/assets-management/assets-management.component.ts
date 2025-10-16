import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Asset, AssetFilter } from './models/asset.model';
import Swal from 'sweetalert2';
import { ViewAssetComponent } from './view-asset/view-asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';

// Category to types mapping
interface CategoryMapping {
  name: string;
  types: string[];
  icon: string;
  color: string;
}

@Component({
  selector: 'app-assets-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ViewAssetComponent,
    AddAssetComponent,
    EditAssetComponent,
  ],
  templateUrl: './assets-management.component.html',
  styleUrl: './assets-management.component.css',
})
export class AssetsManagementComponent implements OnInit {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];

  // Category filtering
  currentCategory: string = '';
  currentCategoryName: string = '';
  categoryMappings: { [key: string]: CategoryMapping } = {
    networking: {
      name: 'Networking',
      types: ['Switch', 'Router', 'Firewall', 'Access Point'],
      icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
      color: 'from-blue-500 to-blue-600',
    },
    computers: {
      name: 'Computers',
      types: ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse'],
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'from-purple-500 to-purple-600',
    },
    servers: {
      name: 'Servers',
      types: ['Server', 'Rack Server', 'Blade Server'],
      icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      color: 'from-green-500 to-green-600',
    },
    storage: {
      name: 'Storage',
      types: ['NAS', 'SAN', 'External Drive', 'Hard Drive'],
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
      color: 'from-yellow-500 to-yellow-600',
    },
    printers: {
      name: 'Printers',
      types: ['Printer', 'Scanner', 'Copier', 'MFP'],
      icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
      color: 'from-red-500 to-red-600',
    },
    phones: {
      name: 'Phones',
      types: ['Mobile Phone', 'Desk Phone', 'VoIP Phone'],
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      color: 'from-indigo-500 to-indigo-600',
    },
    accessories: {
      name: 'Accessories',
      types: ['Cable', 'Adapter', 'Charger', 'Headset', 'Webcam'],
      icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'from-pink-500 to-pink-600',
    },
    others: {
      name: 'Others',
      types: ['Other'],
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
      color: 'from-teal-500 to-teal-600',
    },
  };

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
  selectedAsset: Asset | null = null;

  // Types for dropdown (will be updated based on category)
  types: string[] = [];
  allTypes: string[] = [
    'Laptop',
    'Desktop',
    'Monitor',
    'Keyboard',
    'Mouse',
    'Switch',
    'Router',
    'Firewall',
    'Access Point',
    'Server',
    'Rack Server',
    'Blade Server',
    'NAS',
    'SAN',
    'External Drive',
    'Hard Drive',
    'Printer',
    'Scanner',
    'Copier',
    'MFP',
    'Mobile Phone',
    'Desk Phone',
    'VoIP Phone',
    'Cable',
    'Adapter',
    'Charger',
    'Headset',
    'Webcam',
    'Other',
  ];
  locations: string[] = ['Office A', 'Office B', 'Warehouse', 'Remote'];
  owners: string[] = [
    'IT Department',
    'HR Department',
    'Finance',
    'Operations',
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.currentCategory = params['category'] || '';
      this.typeFilter = params['type'] || '';

      // Update category name and available types
      if (this.currentCategory && this.categoryMappings[this.currentCategory]) {
        this.currentCategoryName =
          this.categoryMappings[this.currentCategory].name;
        this.types = this.categoryMappings[this.currentCategory].types;
      } else {
        this.currentCategoryName = 'All Assets';
        this.types = this.allTypes;
      }

      this.loadAssets();
    });
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
      {
        id: 4,
        serial: 'SRV001',
        type: 'Server',
        name: 'Dell PowerEdge R740',
        owner: 'IT Department',
        location: 'Warehouse',
        category: 'Hardware',
        quantity: 2,
        status: 'Active',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: 5,
        serial: 'PRT001',
        type: 'Printer',
        name: 'HP LaserJet Pro',
        owner: 'HR Department',
        location: 'Office B',
        category: 'Hardware',
        quantity: 4,
        status: 'Active',
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-02-12'),
      },
    ];

    // Apply category filtering
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredAssets = this.assets.filter((asset) => {
      // Category filter
      let matchesCategory = true;
      if (this.currentCategory && this.categoryMappings[this.currentCategory]) {
        const categoryTypes = this.categoryMappings[this.currentCategory].types;
        matchesCategory = categoryTypes.includes(asset.type);
      }

      // Type filter (subcategory)
      const matchesType = !this.typeFilter || asset.type === this.typeFilter;

      // Search filter
      const matchesSearch =
        !this.searchTerm ||
        asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.serial.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.owner.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesCategory && matchesType && matchesSearch;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  goBackToHome(): void {
    this.router.navigate(['/assets/home']);
  }

  clearCategoryFilter(): void {
    this.router.navigate(['/assets/list']);
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  onAdvancedSearch(): void {
    this.filteredAssets = this.assets.filter((asset) => {
      // Category filter
      let matchesCategory = true;
      if (this.currentCategory && this.categoryMappings[this.currentCategory]) {
        const categoryTypes = this.categoryMappings[this.currentCategory].types;
        matchesCategory = categoryTypes.includes(asset.type);
      }

      const matchesType =
        !this.advancedFilter.type || asset.type === this.advancedFilter.type;
      const matchesOwner =
        !this.advancedFilter.ownedBy ||
        asset.owner === this.advancedFilter.ownedBy;
      const matchesLocation =
        !this.advancedFilter.location ||
        asset.location === this.advancedFilter.location;

      return matchesCategory && matchesType && matchesOwner && matchesLocation;
    });
  }

  clearAdvancedSearch(): void {
    this.advancedFilter = {};
    this.applyFilters();
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

  closeModals(): void {
    this.showViewModal = false;
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedAsset = null;
  }

  onAssetAdded(assets: Asset[]): void {
    // Add API call here
    assets.forEach((asset) => {
      const newAsset = {
        ...asset,
        id: this.assets.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.assets.push(newAsset);
    });
    this.applyFilters();
    this.closeModals();

    const count = assets.length;
    Swal.fire({
      icon: 'success',
      title: 'Asset' + (count > 1 ? 's' : '') + ' Added!',
      text: `${count} asset${
        count > 1 ? 's have' : ' has'
      } been successfully added.`,
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
