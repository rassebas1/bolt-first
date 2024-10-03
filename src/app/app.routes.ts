import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list/pokemon', pathMatch: 'full' },
  { path: 'list/:theme', component: ItemListComponent },
  { path: ':theme/:name', component: ItemDetailsComponent },
];