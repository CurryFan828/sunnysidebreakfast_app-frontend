import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Search } from "../search/search";
import { Tags } from '../tags/tags';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
import { PopupAlertComponent } from '../popup-alert/popup-alert';
import { NotFound } from "../not-found/not-found";
import { FavoritesService } from '../services/favorites/favorites.service';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-menu-page',
  imports: [CommonModule, Search, Tags, RouterLink, PopupAlertComponent, NotFound, AsyncPipe],
  templateUrl: './menu-page.html',
  styleUrls: ['./menu-page.css']
})
export class MenuPage implements OnInit {
  addedMessage: string = '';
  showAddedPopup: boolean = false;

  foods$!: Observable<Food[]>;

  constructor(private foodService: FoodService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private alertService: PopupAlertService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    const menuItems$ = this.route.params.pipe(
      switchMap(params => {
        if (params['searchTerm']) {
          return this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
        } else if (params['tag']) {
          return this.foodService.getAllFoodsByTag(params['tag']);
        } else {
          return this.foodService.getMenu();
        }
      }),
      map(foods => {
        this.favoritesService.seedFromFoods(foods);
        return foods.map(f => ({ ...f, quantity: f.quantity ?? 0 }));
      })
    );

    this.foods$ = combineLatest([menuItems$, this.favoritesService.favoriteIds$]).pipe(
      map(([foods, favoriteIds]) => foods.map(f => ({ ...f, favorite: favoriteIds.has(f.id) })))
    );
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
    this.favoritesService.toggleFavorite(food.id);
  }

  addToCart(food: Food) {
    const qty = food.quantity || 0;
    if (qty > 0) {
      for (let i = 0; i < qty; i++) {
        this.cartService.addToCart(food);
      }
      const plural = qty > 1 ? 'orders' : 'order';
      this.alertService.show(`${qty} ${plural} of ${food.name} added`);
      food.quantity = 0;
    }
  }
}
