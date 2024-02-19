import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../auth/auth.guard';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'main',
            component: MainComponent,
            canActivate: [authGuard]
        },
        {
            path: 'favorites',
            component: FavoritesComponent,
            canActivate: [authGuard]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
