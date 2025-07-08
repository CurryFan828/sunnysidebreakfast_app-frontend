import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home';
// import { Search } from './search/search';
import { FoodPage } from './food-page/food-page';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search/:searchTerm', component: HomeComponent},
    {path: 'tag/:tag', component: HomeComponent},
    {path: 'food/:id', component: FoodPage}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
