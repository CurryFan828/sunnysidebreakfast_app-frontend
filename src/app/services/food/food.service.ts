import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAllFoods(): Food[] {
    return [
      { 
        id: 1,
        name: 'Orange Juice',
        cookTime: '0-5',
        price: 4,
        quantity: 0,
        favorite: false,
        stars: 4.5,
        imageUrl: '/assets/foods/drink-1.jpg',
        tags: ['Drink', 'Orange', 'Breakfast'],
      },
      {
        id: 2,
        name: 'French Toast',
        price: 10,
        quantity: 0,
        cookTime: '10-12',
        favorite: true,
        stars: 4.7,
        imageUrl: '/assets/foods/food-1.jpg',
        tags: ['Toast', 'Breakfast', 'French', 'Sweet'],
      },
      {
        id: 3,
        name: 'Eggs, Bacon, & Sausage',
        price: 8,
        quantity: 0,
        cookTime: '5-8',
        favorite: false,
        stars: 3.5,
        imageUrl: '/assets/foods/food-2.jpg',
        tags: ['Meat', 'Breakfast', 'Eggs'],
      },
      {
        id: 4,
        name: 'Waffles',
        price: 7,
        quantity: 0,
        cookTime: '8-12',
        favorite: true,
        stars: 3.3,
        imageUrl: '/assets/foods/food-3.jpg',
        tags: ['Waffles', 'Breakfast', 'Sweet'],
      },
      {
        id: 5,
        name: 'Pancakes',
        price: 10,
        quantity: 0,
        cookTime: '6-8',
        favorite: false,
        stars: 5.0,
        imageUrl: '/assets/foods/food-4.jpg',
        tags: ['Pancakes', 'Breakfast', 'Sweet'],
      },
      {
        id: 6,
        name: 'Choclate Biscuits & Gravy',
        price: 9,
        quantity: 0,
        cookTime: '12-15',
        favorite: true,
        stars: 5.0,
        imageUrl: '/assets/foods/food-5.jpg',
        tags: ['Biscuits', 'Gravy', 'Breakfast', 'Chocolate'],
      },
      {
        id: 7,
        name: 'Biscuits & Gravy',
        price: 9,
        quantity: 0,
        cookTime: '12-15',
        favorite: true,
        stars: 4.7,
        imageUrl: '/assets/foods/food-6.jpg',
        tags: ['Biscuits', 'Gravy', 'Breakfast'],
      },
    ];
  }
}
