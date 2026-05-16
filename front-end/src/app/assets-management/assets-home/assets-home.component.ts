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
  Package,
  MapPin,
  Building2,
  ChevronRight,
  Plus,
  LucideIconData,
} from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/type.service';
import { AssetService } from '../services/asset.service';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { Asset } from '../models/asset.model';
import { AddAssetComponent } from '../add-asset/add-asset.component';
import {
  CategoryTheme,
  getCategoryTheme,
} from '../../core/theme/theme.tokens';

interface CategoryWithDetails extends Category {
  theme: CategoryTheme;
  count: number;
  types: Type[];
}

@Component({
  selector: 'app-assets-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, AddAssetComponent],
  templateUrl: './assets-home.component.html',
  styleUrl: './assets-home.component.css',
})
export class AssetsHomeComponent implements OnInit {
  readonly MapPin = MapPin;
  readonly Building2 = Building2;
  readonly ChevronRight = ChevronRight;
  readonly Plus = Plus;

  private readonly iconMap: Record<string, LucideIconData> = {
    network: Network,
    monitor: Monitor,
    server: Server,
    printer: Printer,
    projector: Projector,
    camera: Camera,
    phone: Phone,
    box: Box,
    package: Package,
  };

  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  private assetService = inject(AssetService);
  private router = inject(Router);

  totalAssets = 0;
  categories: CategoryWithDetails[] = [];
  isLoading = true;
  showAddModal = false;

  get totalTypes(): number {
    return this.categories.reduce((sum, c) => sum + c.types.length, 0);
  }

  ngOnInit(): void {
    this.loadData();
  }

  getCategoryIcon(theme: CategoryTheme): LucideIconData {
    return this.iconMap[theme.icon] ?? Package;
  }

  private loadData(): void {
    this.isLoading = true;

    forkJoin({
      categories: this.categoryService.getAll(),
      types: this.typeService.getAll(),
      assets: this.assetService.getAll(),
    }).subscribe({
      next: ({ categories, types, assets }) => {
        this.totalAssets = assets.length;

        this.categories = categories.map((category) => {
          const categoryTypes = types.filter(
            (t) => t.categoryId === category.id,
          );
          const categoryAssets = assets.filter(
            (a) => a.categoryId === category.id,
          );
          const theme = getCategoryTheme(category.name);

          return {
            ...category,
            theme,
            count: categoryAssets.length,
            types: categoryTypes,
          };
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/assets/list'], {
      queryParams: { categoryId },
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onAssetAdded(_asset: Asset): void {
    this.showAddModal = false;
    this.loadData();
  }
}
