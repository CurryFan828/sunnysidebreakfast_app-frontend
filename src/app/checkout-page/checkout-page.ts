import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-page.html',
  styleUrls: ['./checkout-page.css']
})
export class CheckoutPage {

  @Input() cart?: Cart;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  checkoutFormGroup!: FormGroup;

  totalItems = 0;
  totalPrice = 0;

  showCardForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
      this.calculateTotals();
    });

    this.checkoutFormGroup = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardNumberValidator.bind(this)]],
      expiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  ngOnChanges(): void {
    if (this.cart) {
      this.calculateTotals();
    }
  }

  calculateTotals() {
    if (!this.cart || !this.cart.items) return;

    this.totalItems = this.cart.items.reduce((sum, i) => sum + i.quantity, 0);
    this.totalPrice = this.cart.totalPrice;
  }

  proceedToPayment() {
    this.showCardForm = true;
  }

  closeCardForm() {
    this.showCardForm = false;
  }

  // ✅ FIXED: back button handler
  goBack() {
    const container = document.querySelector('.checkout-container');

    if (container) {
      container.classList.remove('open');
    }

    setTimeout(() => {
      this.router.navigate(['/cart-page']);
    }, 300); // match CSS transition duration
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    if (!this.validateCard()) {
      alert('Please enter valid credit card information.');
      return;
    }

    alert('Order confirmed! Thank you for your purchase.');

    // Start slide-out animation
    const container = document.querySelector('.checkout-container');
    if (container) {
      container.classList.remove('open');
    }

    this.cartService.clearCart();

    // Wait for animation to finish before navigating
    setTimeout(() => {
      this.close.emit();
      this.router.navigate(['/thank-you']);
    }, 350); // matches CSS transition duration
  }

  validateCard(): boolean {
    const form = this.checkoutFormGroup;

    const cardNumber = form.get('cardNumber')?.value?.replace(/\s+/g, '');
    const expiry = form.get('expiration')?.value;
    const cvv = form.get('cvv')?.value;

    if (!/^\d{16}$/.test(cardNumber)) return false;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return false;
    if (!/^\d{3,4}$/.test(cvv)) return false;

    return true;
  }

  cardNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const cleaned = value.replace(/\s+/g, '');
    return /^\d{16}$/.test(cleaned) ? null : { invalidCardNumber: true };
  }

  isInvalid(field: string): boolean {
    const control = this.checkoutFormGroup.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isValid(field: string): boolean {
    const control = this.checkoutFormGroup.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  formatCardNumber(event: any): void {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    input = input.substring(0, 16);

    const groups = input.match(/.{1,4}/g);
    event.target.value = groups ? groups.join(' ') : '';

    this.checkoutFormGroup.get('cardNumber')?.setValue(event.target.value, { emitEvent: false });
  }
}