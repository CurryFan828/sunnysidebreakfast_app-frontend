import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home';
import { Search } from './search/search';
import { FoodPage } from './food-page/food-page';
import { CartPage } from './cart-page/cart-page';
import { MenuPage } from './menu-page/menu-page';
import { Footer } from './footer/footer';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'menu-page', component: MenuPage},
    {path: 'search/:searchTerm', component: MenuPage},
    {path: 'tag/:tag', component: MenuPage},
    {path: 'food/:id', component: FoodPage},
    {path: 'cart-page', component: CartPage},
    { path: '**', redirectTo: '' } 
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
