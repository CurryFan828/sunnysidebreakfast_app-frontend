import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../../shared/models/Cart';
import { Food } from '../../shared/models/Food';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();

  private cart$ = new BehaviorSubject<Cart>(this.cart);

  totalCount$ = this.cart$.pipe(
    map(cart => cart.items.reduce((sum, i) => sum + i.quantity, 0))
  );

  private readonly STORAGE_KEY = 'my_cart';

  constructor() {
    this.loadCart();
    this.cart$.next(this.cart);
  }

  getCartObservable() {
    return this.cart$.asObservable();
  }

  addToCart(food: Food, qty: number = 1): void {
    if (qty <= 0) return;

    const cartItem = this.cart.items.find(ci => ci.food.id === food.id);

    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + qty);
    } else {
      const newItem = new CartItem(food);
      newItem.quantity = qty;
      this.cart.items.push(newItem);
      this.saveCart();
      this.cart$.next(this.cart);
    }
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.saveCart();
    this.cart$.next(this.cart);
  }

  changeQuantity(foodId: number, quantity: number) {
    const item = this.cart.items.find(ci => ci.food.id === foodId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.cart$.next(this.cart);
    }
  }

  getCart(): Cart {
    return this.cart;
  }

  clearCart(): void {
    this.cart.items = [];
    localStorage.removeItem(this.STORAGE_KEY);
    this.cart$.next(this.cart);
  }

  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
  }

  private loadCart(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.cart.items = parsed.items.map((item: any) => {
        const cartItem = new CartItem(item.food);
        cartItem.quantity = item.quantity;
        return cartItem;
      });
    }
  }
}
