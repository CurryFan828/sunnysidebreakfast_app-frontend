import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { Tags } from "../tags/tags";
import { CartService } from '../services/cart/cart.service';
import { NotFound } from "../not-found/not-found";

@Component({
  selector: 'app-food-page',
  imports: [CommonModule, NotFound],
  templateUrl: './food-page.html',
  styleUrls: ['./food-page.css']
})
export class FoodPage implements OnInit{

  food!: Food;
  constructor(private activatedRoute: ActivatedRoute, 
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['id']) {
        this.food = foodService.getFoodById(params['id'])
      }
    } )
   }

  toggleFavorite() {
    this.food.favorite = !this.food.favorite;
  }

  ngOnInit(): void {
    
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/');
  }




}
