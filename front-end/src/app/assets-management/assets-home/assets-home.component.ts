import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Cctv } from 'lucide-angular';

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  subCategories?: SubCategory[]; // Will be populated later
}

@Component({
  selector: 'app-assets-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './assets-home.component.html',
  styleUrl: './assets-home.component.css',
})
export class AssetsHomeComponent {
  readonly Cctv = Cctv;
  totalAssets: number = 0;
  categories: Category[] = [
    {
      id: 'networking',
      name: 'Networking',
      icon: 'network',
      color: 'from-blue-500 to-blue-600',
      count: 45,
      subCategories: [], // Will add: Switches, Access Points, Firewalls, etc.
    },
    {
      id: 'computers',
      name: 'Computers',
      icon: 'monitor',
      color: 'from-purple-500 to-purple-600',
      count: 67,
      subCategories: [], // Will add: Desktops, Laptops
    },
    {
      id: 'servers',
      name: 'Servers',
      icon: 'server',
      color: 'from-green-500 to-green-600',
      count: 23,
      // Will add subcategories later
    },
    {
      id: 'racks',
      name: 'Racks',
      icon: 'rows-4',
      color: 'from-yellow-500 to-yellow-600',
      count: 18,
      subCategories: [], // Will add subcategories later
    },
    {
      id: 'printers',
      name: 'Printers',
      icon: 'printer',
      color: 'from-red-500 to-red-600',
      count: 15,
      subCategories: [], // Will add subcategories later
    },
    {
      id: 'ip-phones',
      name: 'IP Phones',
      icon: 'phone-call',
      color: 'from-indigo-500 to-indigo-600',
      count: 32,
      subCategories: [], // Will add subcategories later
    },
    {
      id: 'projectors',
      name: 'Projectors',
      icon: 'projector',
      color: 'from-pink-500 to-pink-600',
      count: 54,
      subCategories: [], // Will add subcategories later
    },
    {
      id: 'cameras',
      name: 'Cameras',
      icon: 'cctv',
      color: 'from-teal-500 to-teal-600',
      count: 12,
      subCategories: [], // Will add subcategories later
    },
  ];

  constructor(private router: Router) {}

  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/assets/list'], {
      queryParams: { category: categoryId },
    });
  }
}
