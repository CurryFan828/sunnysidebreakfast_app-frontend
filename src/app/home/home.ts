import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { Food} from '../shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule],
  standalone: true
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private food: FoodService) { }

  ngOnInit(): void {
      // Initialization logic can go here
      this.foods = this.food.getAllFoods();
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
}
