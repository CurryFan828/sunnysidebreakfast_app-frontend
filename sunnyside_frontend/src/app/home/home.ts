import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { CommonModule } from '@angular/common';

import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Search } from "../search/search";
import { Tags } from '../tags/tags';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
import { PopupAlertComponent } from '../popup-alert/popup-alert';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule],
  standalone: true
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
  }

}
