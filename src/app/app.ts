import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from "./header/header";
import { Search } from "./search/search";
import { FormsModule } from '@angular/forms';
import { FoodPage } from "./food-page/food-page";
import { Footer } from "./footer/footer";
// import { BrowserModule } from '@angular/platform-browser'
// import { NgModule } from '@angular/core';
// import { HomeComponent } from './home/home';
// import { AppRoutingModule } from './app.routes';


// @NgModule({
//   declarations: [
//     App,
//     Header,
//     HomeComponent, 
//     Search
//   ],
  
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule
//   ],

  // providers: [],

//   bootstrap: [App]
// })

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'SunnySide Breakfast';

  isHomePage = false;

  isLoggedIn = false;
  userDisplayName = 'Guest';

  handleLogin(user: string) {
    this.isLoggedIn = true;
    this.userDisplayName = user || 'Guest';
  }

  handleLogout() {
    this.isLoggedIn = false;
    this.userDisplayName = 'Guest';
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.urlAfterRedirects === '/';
      });
  }
}
