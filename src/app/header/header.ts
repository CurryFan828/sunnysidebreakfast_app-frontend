import { Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { ShoppingCart } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header{

  constructor(private cartService: CartService, private router: Router) {}
  // @Input() isHero = false; // default false, so that its true on home and false everywhere else

  ngOnInit() {

  }
}
