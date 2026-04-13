import { Component, Input, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { CommonModule } from '@angular/common';

// import { Cart } from '../shared/models/Cart';
// import { ShoppingCart } from 'lucide-angular';
// import { HomeComponent } from '../home/home';


@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

  menuOpen = false;
  cartCount = 0;
  isLoggedIn = false; // or get from your AuthService or localStorage
  isHomePage = false; 


  constructor(private cartService: CartService, private router: Router) {}
  // @Input() isHero = false; // default false, so that its true on home and false everywhere else

  ngOnInit() {
    this.cartService.totalCount$.subscribe(count => {
      this.cartCount = count;
      });

    // route detection
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomePage = event.urlAfterRedirects === '/';
      });
  }

  continueAsGuest() {
    // You could set a flag, or navigate somewhere
    // For example:
    this.isLoggedIn = false; // Just a safety flag if needed
    // Navigate to menu or home page
    this.router.navigate(['/menu-page']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
