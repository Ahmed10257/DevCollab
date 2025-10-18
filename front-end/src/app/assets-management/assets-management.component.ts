import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Asset, AssetFilter } from './models/asset.model';
import { Category } from './models/category.model';
import { Type } from './models/type.model';
import { CategoryService } from './services/category.service';
import { TypeService } from './services/type.service';
import { AssetService } from './services/asset.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { ViewAssetComponent } from './view-asset/view-asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';

// Category to types mapping
interface CategoryMapping {
  id: number;
  name: string;
  types: Type[];
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
  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  private assetService = inject(AssetService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  categories: Category[] = [];
  allTypes: Type[] = [];
  
  // Category filtering
  currentCategoryId: number | null = null;
  currentCategoryName: string = '';
  currentTypes: Type[] = [];

  // Search and filter
  searchTerm: string = '';
  selectedTypeId: number | null = null;
  selectedStatus: string = '';

  // Advanced search
  showAdvancedSearch: boolean = false;
  advancedFilter: AssetFilter = {};

  // Modal states
  showViewModal: boolean = false;
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  selectedAsset: Asset | null = null;

  // Loading state
  isLoading: boolean = true;

  // Status options
  statusOptions: string[] = ['Active', 'In Use', 'Maintenance', 'Retired', 'Storage'];

  ngOnInit(): void {
    // Load categories and types first
    this.loadInitialData();

    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      const typeId = params['typeId'];
      
      if (categoryId) {
        this.currentCategoryId = +categoryId;
        const category = this.categories.find(c => c.id === this.currentCategoryId);
        if (category) {
          this.currentCategoryName = category.name;
          this.currentTypes = this.allTypes.filter(t => t.categoryId === this.currentCategoryId);
        }
      } else {
        this.currentCategoryId = null;
        this.currentCategoryName = 'All Assets';
        this.currentTypes = this.allTypes;
      }

      if (typeId) {
        this.selectedTypeId = +typeId;
      }

      this.loadAssets();
    });
  }

  private loadInitialData(): void {
    forkJoin({
      categories: this.categoryService.getAll(),
      types: this.typeService.getAll()
    }).subscribe({
      next: ({ categories, types }) => {
        this.categories = categories;
        this.allTypes = types;
        this.currentTypes = types;
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load categories and types'
        });
      }
    });
  }

  private loadAssets(): void {
    this.isLoading = true;
    
    const filter: AssetFilter = {};
    if (this.currentCategoryId) {
      filter.categoryId = this.currentCategoryId;
    }
    if (this.selectedTypeId) {
      filter.typeId = this.selectedTypeId;
    }
    if (this.selectedStatus) {
      filter.status = this.selectedStatus;
    }
    if (this.searchTerm) {
      filter.searchTerm = this.searchTerm;
    }

    this.assetService.getAll(filter).subscribe({
      next: (assets) => {
        this.assets = assets;
        this.filteredAssets = assets;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading assets:', error);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load assets'
        });
      }
    });
  }

  onSearch(): void {
    this.loadAssets();
  }

  onTypeFilterChange(): void {
    this.loadAssets();
  }

  onStatusFilterChange(): void {
    this.loadAssets();
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
    this.isLoading = true;
    this.assetService.getAll(this.advancedFilter).subscribe({
      next: (assets) => {
        this.assets = assets;
        this.filteredAssets = assets;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading assets:', error);
        this.isLoading = false;
      }
    });
  }

  clearAdvancedSearch(): void {
    this.advancedFilter = {};
    this.searchTerm = '';
    this.loadAssets();
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

  onAssetAdded(asset: Asset): void {
    this.closeModals();
    this.loadAssets();
    
    Swal.fire({
      icon: 'success',
      title: 'Asset Added!',
      text: `${asset.name} has been successfully added.`,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  onAssetUpdated(asset: Asset): void {
    this.closeModals();
    this.loadAssets();

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
        this.assetService.delete(asset.id).subscribe({
          next: () => {
            this.loadAssets();
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `${asset.name} has been deleted.`,
              timer: 2000,
              showConfirmButton: false,
            });
          },
          error: (error) => {
            console.error('Error deleting asset:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete asset'
            });
          }
        });
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  getTypeName(typeId: number): string {
    const type = this.allTypes.find(t => t.id === typeId);
    return type ? type.name : 'Unknown';
  }
}
