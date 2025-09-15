// profile-page.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../services/auth/auth';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css'],
})

export class ProfilePage implements OnInit {
  user: User | null = null;

  orderHistory = [
    { id: 1, date: '2024-06-01', items: ['Test1', 'Soda'], total: '$18.50' },
    { id: 2, date: '2024-06-14', items: ['Test2', 'Fries'], total: '$12.25' },
  ];
  favoriteFoods = ['Pizza', 'Fries', 'Sushi'];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  getOrderHistory(){
    return this.orderHistory;
  }

}
