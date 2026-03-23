import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
import { PopupAlertComponent } from '../popup-alert/popup-alert';
import { NotFound } from "../not-found/not-found";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { CheckoutPage } from '../checkout-page/checkout-page';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterModule, PopupAlertComponent, NotFound],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit {

  cart!: Cart;
  totalQuantity: number = 0;

  isMobile: boolean = false;
  showCheckoutPanel: boolean = false;

  constructor(
    private cartService: CartService,
    private alertService: PopupAlertService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.setCart();

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.setCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.alertService.show(`${cartItem.food.name} removed from cart\u200B`);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString, 10);
    if (quantity > 0) {
      this.cartService.changeQuantity(cartItem.food.id, quantity);
      this.setCart();
    }
  }

  setCart() {
    this.cart = this.cartService.getCart();
    this.totalQuantity = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  openCheckout() {
    this.router.navigate(['/checkout']);
  }

  closeCheckout() {
    this.showCheckoutPanel = false;

    if (this.isMobile) {
      this.router.navigate(['/cart-page']);
    }
  }

  incrementQuantity(item: CartItem) {
    this.cartService.changeQuantity(item.food.id, item.quantity + 1);
    this.updateTotalQuantity();
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.changeQuantity(item.food.id, item.quantity - 1);
      this.updateTotalQuantity();
    }
  }

  updateTotalQuantity() {
    const cart = this.cartService.getCart();
    this.totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}