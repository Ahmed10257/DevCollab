import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Asset, AssetFilter } from './models/asset.model';

@Component({
  selector: 'app-assets-management',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './assets-management.component.html',
  styleUrl: './assets-management.component.css',
})
export class AssetsManagementComponent {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];

  // Search and filter
  searchTerm: string = '';
  categoryFilter: string = '';

  // Advanced search
  showAdvancedSearch: boolean = false;
  advancedFilter: AssetFilter = {};

  // Categories for dropdown
  categories: string[] = [
    'Hardware',
    'Software',
    'Furniture',
    'Equipment',
    'Other',
  ];
  locations: string[] = ['Office A', 'Office B', 'Warehouse', 'Remote'];
  owners: string[] = [
    'IT Department',
    'HR Department',
    'Finance',
    'Operations',
  ];

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
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-15'),
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

      const matchesCategory =
        !this.categoryFilter || asset.category === this.categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  onAdvancedSearch(): void {
    this.filteredAssets = this.assets.filter((asset) => {
      const matchesCategory =
        !this.advancedFilter.category ||
        asset.category === this.advancedFilter.category;
      const matchesOwner =
        !this.advancedFilter.ownedBy ||
        asset.owner === this.advancedFilter.ownedBy;
      const matchesLocation =
        !this.advancedFilter.location ||
        asset.location === this.advancedFilter.location;

      return matchesCategory && matchesOwner && matchesLocation;
    });
  }

  clearAdvancedSearch(): void {
    this.advancedFilter = {};
    this.filteredAssets = [...this.assets];
  }

  viewAsset(asset: Asset): void {
    // Navigate to view asset page or open modal
    console.log('View asset:', asset);
  }

  editAsset(asset: Asset): void {
    // Navigate to edit asset page or open modal
    console.log('Edit asset:', asset);
  }

  deleteAsset(asset: Asset): void {
    if (confirm(`Are you sure you want to delete ${asset.name}?`)) {
      this.assets = this.assets.filter((a) => a.id !== asset.id);
      this.onSearch();
    }
  }
}
