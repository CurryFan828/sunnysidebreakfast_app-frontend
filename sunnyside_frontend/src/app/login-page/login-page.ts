import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {
  name = '';
  phone = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    const user: User = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      favorites: ['Waffles', 'Biscuits & Gravy', 'Eggs'],  // mock favorites
      orders: [
        { id: 1, item: 'Waffles', date: '2025-07-01' },
        { id: 2, item: 'Eggs', date: '2025-07-10' },
      ],
    };

    this.auth.login(user);
    this.router.navigate(['/profile']);
  }

  continueAsGuest() {
    // Maybe set a guest flag, clear user info, or just navigate forward
    // localStorage.setItem('guestUser', 'true');
    // For example:
    this.router.navigate(['/menu-page']);
  }
}
