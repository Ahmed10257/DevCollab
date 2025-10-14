import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-view-asset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.css'],
})
export class ViewAssetComponent {
  @Input() asset!: Asset;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Asset>();
  @Output() delete = new EventEmitter<Asset>();

  onClose(): void {
    this.close.emit();
  }

  onEdit(): void {
    this.close.emit();
    this.edit.emit(this.asset);
  }

  onDelete(): void {
    this.close.emit();
    this.delete.emit(this.asset);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
