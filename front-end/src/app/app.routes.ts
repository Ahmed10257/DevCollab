import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { AssetsHomeComponent } from './assets-management/assets-home/assets-home.component';
import { AddAssetComponent } from './assets-management/add-asset/add-asset.component';
import { ViewAssetComponent } from './assets-management/view-asset/view-asset.component';
import { EditAssetComponent } from './assets-management/edit-asset/edit-asset.component';
import { ManageLocationsComponent } from './manage-locations/manage-locations.component';
import { ManageManufacturersModelsComponent } from './manage-manufacturers-models/manage-manufacturers-models.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/assets/home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'assets/home',
    component: AssetsHomeComponent,
  },
  {
    path: 'assets/list',
    component: AssetsManagementComponent,
  },
  {
    path: 'assets/add',
    component: AddAssetComponent,
  },
  {
    path: 'assets/view/:id',
    component: ViewAssetComponent,
  },
  {
    path: 'assets/edit/:id',
    component: EditAssetComponent,
  },
  {
    path: 'assets/manage-locations',
    component: ManageLocationsComponent,
  },
  {
    path: 'assets/manage-manufacturers-models',
    component: ManageManufacturersModelsComponent,
  },
  {
    path: '**',
    redirectTo: '/assets/home',
  },
];
