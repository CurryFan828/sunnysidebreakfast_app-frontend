import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { Tags } from "../tags/tags";

@Component({
  selector: 'app-food-page',
  imports: [CommonModule],
  templateUrl: './food-page.html',
  styleUrls: ['./food-page.css']
})
export class FoodPage implements OnInit{

  food!: Food;
  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService) {
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
}
