import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-page.html',
  styleUrls: ['./checkout-page.css']
})

export class CheckoutPage {
  @Input() cart!: Cart;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  // @ViewChild('checkoutForm') checkoutFormElement!: ElementRef;


  checkoutFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
  
  }

  totalItems = 0;
  totalPrice = 0;

  showCardForm = false;

  cardNumber = '';
  expiry = '';
  cvv = '';


  ngOnChanges() {
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalItems = this.cart.items.reduce((sum, i) => sum + i.quantity, 0);
    this.totalPrice = this.cart.totalPrice;
  }

  proceedToPayment() {
    this.showCardForm = true;
  }

  closeCardForm() {
    this.showCardForm = false;
  }

  confirmOrder() {
    if (this.validateCard()) {
      alert('Order confirmed! Thank you for your purchase.');
      this.close.emit();
      // optionally route to home page
      this.router.navigate(['/']);
    } else {
      alert('Please enter valid credit card information.');
    }
  }



  // =========== Card Validation ===========

  validateCard(): boolean {
    // Simple checks: length, numbers only, basic patterns

    const cardNumClean = this.cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cardNumClean)) return false;
    if (!/^\d{2}\/\d{2}$/.test(this.expiry)) return false;
    if (!/^\d{3,4}$/.test(this.cvv)) return false;

    return true;
  }

  cardNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const cleaned = value.replace(/\s+/g, '');
    return /^\d{16}$/.test(cleaned) ? null : { invalidCardNumber: true };
  }


  ngOnInit(): void {
    this.checkoutFormGroup = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardNumberValidator.bind(this)]],
      expiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // Simulate successful checkout
    this.router.navigate(['/thank-you']);
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
    // Remove all non-digit characters
    input = input.replace(/\D/g, '');
    // Limit to 16 digits
    input = input.substring(0, 16);
    // Add dashes every 4 digits
    const groups = input.match(/.{1,4}/g);
    event.target.value = groups ? groups.join(' ') : '';
    
    // Update the form control manually
    this.checkoutFormGroup.get('cardNumber')?.setValue(event.target.value, { emitEvent: false });
  }

}
