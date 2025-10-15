import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-add-quantity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.css'],
})
export class AddQuantityComponent {
  @Input() assets: Asset[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ assetId: number; quantity: number }>();

  selectedAssetId: number | null = null;
  quantityToAdd: number = 1;
  selectedAsset: Asset | null = null;

  onClose(): void {
    this.close.emit();
  }

  onAssetSelect(): void {
    if (this.selectedAssetId) {
      this.selectedAsset =
        this.assets.find((a) => a.id === this.selectedAssetId) || null;
    } else {
      this.selectedAsset = null;
    }
  }

  onSubmit(): void {
    if (this.selectedAssetId && this.quantityToAdd > 0) {
      this.save.emit({
        assetId: this.selectedAssetId,
        quantity: this.quantityToAdd,
      });
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
