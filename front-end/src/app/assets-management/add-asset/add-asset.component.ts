import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent {
  asset: Asset = {
    serial: '',
    type: '',
    name: '',
    owner: '',
    location: '',
    category: '',
    quantity: 1,
    status: 'Active',
  };

  categories: string[] = [
    'Hardware',
    'Software',
    'Furniture',
    'Equipment',
    'Other',
  ];
  locations: string[] = ['Office A', 'Office B', 'Warehouse', 'Remote'];
  statuses: string[] = ['Active', 'Inactive', 'Maintenance', 'Retired'];

  constructor(private router: Router) {}

  onSubmit(): void {
    // Add API call here to save the asset
    console.log('Adding asset:', this.asset);
    this.router.navigate(['/assets']);
  }

  onCancel(): void {
    this.router.navigate(['/assets']);
  }
}
