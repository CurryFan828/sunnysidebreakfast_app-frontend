import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../../shared/models/Cart';
import { Food } from '../../shared/models/Food';
import { CartItem } from '../../shared/models/CartItem';

const CART_STORAGE_KEY = 'my_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();


  /* NEW — stream of the whole cart so other components can react */
  private cart$ = new BehaviorSubject<Cart>(this.cart);


  /* NEW — observable that emits the total # of items */
  totalCount$ = this.cart$.pipe(
    map(cart => cart.items.reduce((sum, i) => sum + i.quantity, 0))
  );




  /** let any component subscribe to the whole cart object */
  // getCartObservable() {
  //   return this.cart$.asObservable();
  // }


  constructor() {
    this.loadCart();
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
      this.cart$.next(this.cart);   // ⬅️ notify subscribers (badge)
    }
  }


  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.saveCart();
    this.cart$.next(this.cart);   // ⬅️ notify subscribers (badge)
  }


  changeQuantity(foodId: number, quantity: number) {
    const item = this.cart.items.find(ci => ci.food.id === foodId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();          // Save updated cart
      this.cart$.next(this.cart);  // Notify subscribers for UI update
    }
  }




  // private persistAndEmit() {
  //   localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
  //   this.cart$.next(this.cart);
  // }

  getCart(): Cart {
    return this.cart;
  }


  // ✅ Save to localStorage
  private saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
  }


  // ✅ Load from localStorage
  private loadCart() {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);

      // Rebuild CartItem and Food objects if needed
      this.cart.items = parsed.items.map((item: any) => {
        const cartItem = new CartItem(item.food);
        cartItem.quantity = item.quantity;
        return cartItem;
      });
    }
  }


}
