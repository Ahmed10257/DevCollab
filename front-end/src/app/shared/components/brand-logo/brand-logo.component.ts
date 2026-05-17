import { Component, input } from '@angular/core';
import { BRAND_ASSETS } from '../../../core/brand/brand.assets';

export type BrandLogoVariant = 'icon' | 'full';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  templateUrl: './brand-logo.component.html',
  styleUrl: './brand-logo.component.css',
})
export class BrandLogoComponent {
  readonly variant = input<BrandLogoVariant>('full');
  readonly alt = input('DevCollab');

  readonly iconSrc = BRAND_ASSETS.logoIcon;
  readonly fullSrc = BRAND_ASSETS.logoFull;
}
