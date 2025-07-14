import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { FoodService } from '../services/food/food.service';
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
import { PopupAlertComponent } from '../popup-alert/popup-alert';
import { NotFound } from "../not-found/not-found";


@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterModule, PopupAlertComponent, NotFound],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit{

  cart!: Cart;
  constructor(
    private cartService: CartService,
    private alertService: PopupAlertService
  ) {
    this.setCart()
   }

  ngOnInit(): void {
    this.setCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);

    /* 🔴 red popup (color is set in cart-page.css) */
    this.alertService.show(`${cartItem.food.name} removed from cart`);
    
    this.setCart(); 
  }

  changeQuantity(cartItem: CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity)
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart()
  }

}
