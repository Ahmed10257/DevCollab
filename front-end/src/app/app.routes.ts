import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { AssetsHomeComponent } from './assets-management/assets-home/assets-home.component';
import { AddAssetComponent } from './assets-management/add-asset/add-asset.component';
import { ViewAssetComponent } from './assets-management/view-asset/view-asset.component';
import { EditAssetComponent } from './assets-management/edit-asset/edit-asset.component';
import { ManageLocationsComponent } from './manage-locations/manage-locations.component';
import { ManageManufacturersModelsComponent } from './manage-manufacturers-models/manage-manufacturers-models.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/assets/home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: AuthComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'auth/register',
    component: AuthComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'assets/home',
    component: AssetsHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assets/list',
    component: AssetsManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assets/add',
    component: AddAssetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assets/view/:id',
    component: ViewAssetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assets/edit/:id',
    component: EditAssetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assets/manage-locations',
    component: ManageLocationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assets/manage-manufacturers-models',
    component: ManageManufacturersModelsComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/assets/home',
  },
];
