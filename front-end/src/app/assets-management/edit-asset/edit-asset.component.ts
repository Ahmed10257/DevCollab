import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-edit-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css'],
})
export class EditAssetComponent implements OnInit {
  @Input() asset!: Asset;
  @Input() types: string[] = [];
  @Input() locations: string[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Asset>();

  editedAsset!: Asset;
  statuses: string[] = ['Active', 'Inactive', 'Maintenance', 'Retired'];
  categories: string[] = [
    'Hardware',
    'Software',
    'Furniture',
    'Equipment',
    'Other',
  ];

  ngOnInit(): void {
    // Create a copy of the asset to edit
    this.editedAsset = { ...this.asset };
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.save.emit(this.editedAsset);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
