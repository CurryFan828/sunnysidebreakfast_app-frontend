import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { RouterModule } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FoodService } from '../services/food/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags',
  imports: [RouterModule, CommonModule, AsyncPipe],
  templateUrl: './tags.html',
  styleUrls: ['./tags.css']
})
export class Tags implements OnInit {

  @Input() foodPageTags?: string[];
  tags$?: Observable<Tag[]>;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    if (!this.foodPageTags) {
      this.tags$ = this.foodService.getAllTags();
    }
  }
}
