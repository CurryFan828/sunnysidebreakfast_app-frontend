import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
// import { Tags } from "../tags/tags";
import { CartService } from '../services/cart/cart.service';
// import { NotFound } from "../not-found/not-found";
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
// import { PopupAlertComponent } from '../popup-alert/popup-alert';
import { FavoritesService } from '../services/favorites/favorites.service';


@Component({
  selector: 'app-food-page',
  imports: [CommonModule, /*NotFound, PopupAlertComponent*/],
  templateUrl: './food-page.html',
  styleUrls: ['./food-page.css']
})
export class FoodPage implements OnInit{

  food!: Food;
  constructor(private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router,
    private alertService: PopupAlertService,
    private favoritesService: FavoritesService
) {
    activatedRoute.params.subscribe((params) => {
      if(params['id']) {
        foodService.getFoodById(params['id']).subscribe(food => {
          if(food) this.food = { ...food, favorite: this.favoritesService.isFavorite(food.id) };
        });
      }
    } )
   }

  toggleFavorite() {
    this.favoritesService.toggleFavorite(this.food.id);
    this.food.favorite = this.favoritesService.isFavorite(this.food.id);
  }

  ngOnInit(): void {
    
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.alertService.show(`${this.food.name} added to cart.`);
  }

  testClick() {
    console.log('Back button clicked');
  }

  goBack() {
    this.router.navigate(['/menu-page']);
  }
}
