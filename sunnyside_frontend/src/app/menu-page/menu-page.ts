import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Search } from "../search/search";
import { Tags } from '../tags/tags';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
import { PopupAlertComponent } from '../popup-alert/popup-alert';
import { NotFound } from "../not-found/not-found";

@Component({
  selector: 'app-menu-page',
  imports: [CommonModule, Search, Tags, RouterLink, PopupAlertComponent, NotFound],
  templateUrl: './menu-page.html',
  styleUrls: ['./menu-page.css']
})
export class MenuPage implements OnInit{
  addedMessage: string = '';
  showAddedPopup: boolean = false;

  foods: Food[] = [];
  constructor(private foodService: FoodService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private alertService: PopupAlertService
  ) { }

  ngOnInit(): void {
    // Subscribe to the route parameters to get the search term
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
        } else if(params['tag']) {
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
        } else {
        this.foods = this.foodService.getAllFoods();
        }
        // ensure each food has a counter field
        this.foods.forEach(f => (f.quantity ??= 0));
    });
  }

  increment(food: Food) {
    food.quantity = (food.quantity || 0) + 1;
  }

  decrement(food: Food) {
    if ((food.quantity || 0) > 0) {
      food.quantity = (food.quantity || 0) - 1;
    }
  }

  toggleFavorite(food: Food) {
    food.favorite = !food.favorite;
  }

  /** Push the chosen quantity into the cart, then reset the counter */
  addToCart(food: Food) {
    const qty = food.quantity || 0;
    if (qty > 0) {
      
      // this.cartService.addToCart(food, qty); 
      // Add the item(s) to the cart
      for (let i = 0; i < qty; i++) {
        this.cartService.addToCart(food);
      }

      // Show popup alert with proper pluralization
      const plural = qty > 1 ? 'orders' : 'order';
      this.alertService.show(`${qty} ${plural} of ${food.name} added`);

      // Reset quantity to zero after adding
      food.quantity = 0;
    }
  }
}
