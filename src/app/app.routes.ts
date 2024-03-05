import { Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

export const routes: Routes = [
  { path: '', component: InventoryListComponent, pathMatch: 'full' },
  { path: 'auth', loadComponent: () => import('./auth/auth.component').then((m) => m.AuthComponent),},
  { path: 'add-inventory', loadComponent: () => import('./inventory-add/inventory-add.component').then((m) => m.AddInventoryComponent),},
  { path: 'edit-inventory/:id', loadComponent: () => import('./inventory-edit/inventory-edit.component').then( (m) => m.EditInventoryComponent),},
];
