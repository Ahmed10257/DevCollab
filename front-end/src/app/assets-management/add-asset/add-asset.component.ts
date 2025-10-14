import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent {
  @Input() types: string[] = [];
  @Input() locations: string[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Asset>();

  asset: Asset = {
    serial: '',
    type: '',
    name: '',
    owner: '',
    location: '',
    category: 'Hardware',
    quantity: 1,
    status: 'Active',
  };

  statuses: string[] = ['Active', 'Inactive', 'Maintenance', 'Retired'];
  categories: string[] = [
    'Hardware',
    'Software',
    'Furniture',
    'Equipment',
    'Other',
  ];

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.save.emit(this.asset);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
