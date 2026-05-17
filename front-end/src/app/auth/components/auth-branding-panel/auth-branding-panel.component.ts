import { Component } from '@angular/core';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';

@Component({
  selector: 'app-auth-branding-panel',
  standalone: true,
  imports: [BrandLogoComponent],
  templateUrl: './auth-branding-panel.component.html',
  styleUrl: './auth-branding-panel.component.css',
})
export class AuthBrandingPanelComponent {}
