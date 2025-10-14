import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { AddAssetComponent } from './assets-management/add-asset/add-asset.component';
import { ViewAssetComponent } from './assets-management/view-asset/view-asset.component';
import { EditAssetComponent } from './assets-management/edit-asset/edit-asset.component';
import { AddQuantityComponent } from './assets-management/add-quantity/add-quantity.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'assets',
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
    path: 'assets/add-quantity',
    component: AddQuantityComponent,
  },
];
