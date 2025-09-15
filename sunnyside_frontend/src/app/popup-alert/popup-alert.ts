import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupAlertService } from '../services/popup-alert/popup-alert.service';
import { CartPage } from '../cart-page/cart-page'; 
import { MenuPage } from '../menu-page/menu-page';
import { FoodPage } from '../food-page/food-page';

@Component({
  selector: 'app-popup-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-alert.html',
  styleUrls: ['./popup-alert.css']
})
export class PopupAlertComponent {

  @Input() type: 'success' | 'error' = 'success';

  alertMessage: string | null = null;

  /** The current message (empty string means “hidden”) */
  message = '';
  visible: boolean = false;

  constructor(private alertService: PopupAlertService) {
    this.alertService.alert$.subscribe(msg => {
      this.message = msg;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }
}
