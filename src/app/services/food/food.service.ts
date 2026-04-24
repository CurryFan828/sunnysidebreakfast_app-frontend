import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly memoryUrl = 'http://sunnysideb-api.isaacstanek.com/';
  protected menu$!: Observable<Food[]>;


  constructor(private readonly httpClient: HttpClient) {
    this.menu$ = this.httpClient.get<Food[]>(this.memoryUrl).pipe(shareReplay(1));
  }

  getMenu(): Observable<Food[]> {
    return this.menu$;
  }

  getFoodById(id: number): Observable<Food | undefined> {
    return this.menu$.pipe(
      map(foods => foods.find(food => food.id == id))
    );
  }

  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return this.menu$.pipe(
      map(foods => foods.filter(food => this.matchesOrderedLetters(food.name, normalizedSearchTerm)))
    );
  }

  private matchesOrderedLetters(text: string, query: string): boolean {
    if (!query) {
      return true;
    }

    let queryIndex = 0;
    const loweredText = text.toLowerCase();
    for (const character of loweredText) {
      if (character === query[queryIndex]) {
        queryIndex += 1;
      }

      if (queryIndex === query.length) {
        return true;
      }
    }

    return false;

  }

  private readonly CATEGORIES = ['Breakfast', 'Drinks', 'Sides'];

  getAllTags(): Observable<Tag[]> {
    return this.menu$.pipe(
      map(foods =>
        this.CATEGORIES.map(cat => ({
          name: cat,
          count: foods.filter(food => food.tags?.includes(cat)).length
        }))
      )
    );
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return this.menu$.pipe(
      map(foods => tag === "All" ? foods : foods.filter(food => food.tags?.includes(tag)))
    );
  }
}
