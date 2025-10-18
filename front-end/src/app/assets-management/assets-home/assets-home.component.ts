import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  LucideAngularModule, 
  Network, 
  Monitor, 
  Server, 
  Printer, 
  Projector, 
  Camera, 
  Phone, 
  Box,
  Package 
} from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { AssetService } from '../services/asset.service';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { Asset } from '../models/asset.model';

interface CategoryWithDetails extends Category {
  icon: string;
  color: string;
  count: number;
  types: Type[];
}

// Icon and color mapping for categories
const categoryStyleMap: { [key: string]: { icon: string; color: string } } = {
  'networking': { icon: 'network', color: 'from-blue-500 to-blue-600' },
  'computers': { icon: 'monitor', color: 'from-purple-500 to-purple-600' },
  'servers': { icon: 'server', color: 'from-green-500 to-green-600' },
  'printers': { icon: 'printer', color: 'from-red-500 to-red-600' },
  'projectors': { icon: 'projector', color: 'from-pink-500 to-pink-600' },
  'cameras': { icon: 'camera', color: 'from-teal-500 to-teal-600' },
  'ip phones': { icon: 'phone', color: 'from-orange-500 to-orange-600' },
  'racks': { icon: 'box', color: 'from-indigo-500 to-indigo-600' },
};

@Component({
  selector: 'app-assets-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './assets-home.component.html',
  styleUrl: './assets-home.component.css',
})
export class AssetsHomeComponent implements OnInit {
  // Icon components for template
  readonly Network = Network;
  readonly Monitor = Monitor;
  readonly Server = Server;
  readonly Printer = Printer;
  readonly Projector = Projector;
  readonly Camera = Camera;
  readonly Phone = Phone;
  readonly Box = Box;
  readonly Package = Package;
  
  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  private assetService = inject(AssetService);
  private router = inject(Router);

  totalAssets: number = 0;
  categories: CategoryWithDetails[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    console.log('🚀 AssetsHomeComponent initialized');
    console.log('📡 Services:', {
      categoryService: this.categoryService,
      typeService: this.typeService,
      assetService: this.assetService
    });
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    
    console.log('🔄 Loading data from API...');
    
    forkJoin({
      categories: this.categoryService.getAll(),
      types: this.typeService.getAll(),
      assets: this.assetService.getAll()
    }).subscribe({
      next: ({ categories, types, assets }) => {
        console.log('✅ Data received:', {
          categories: categories.length,
          types: types.length,
          assets: assets.length
        });
        
        this.totalAssets = assets.length;
        
        // Map categories with their types and asset counts
        this.categories = categories.map(category => {
          const categoryTypes = types.filter(t => t.categoryId === category.id);
          const categoryAssets = assets.filter(a => a.categoryId === category.id);
          
          // Get style based on category name (lowercase)
          const categoryName = category.name.toLowerCase();
          const style = categoryStyleMap[categoryName] || {
            icon: 'package',
            color: 'from-gray-500 to-gray-600'
          };
          
          console.log(`📦 Category: ${category.name} (${categoryName}) -> icon: ${style.icon}, assets: ${categoryAssets.length}`);
          
          return {
            ...category,
            icon: style.icon,
            color: style.color,
            count: categoryAssets.length,
            types: categoryTypes
          };
        });
        
        console.log('✅ Categories mapped:', this.categories.length);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading data:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/assets/list'], {
      queryParams: { categoryId: categoryId },
    });
  }
}
