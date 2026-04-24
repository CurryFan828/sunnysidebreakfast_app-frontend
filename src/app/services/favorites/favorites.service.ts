import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../../shared/models/Food';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'sunnyside_favorites';
  private favoriteIds = new BehaviorSubject<Set<number>>(this.loadFromStorage());

  favoriteIds$ = this.favoriteIds.asObservable();

  private loadFromStorage(): Set<number> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  }

  private saveToStorage(ids: Set<number>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...ids]));
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.getValue().has(id);
  }

  toggleFavorite(id: number): void {
    const ids = new Set(this.favoriteIds.getValue());
    ids.has(id) ? ids.delete(id) : ids.add(id);
    this.favoriteIds.next(ids);
    this.saveToStorage(ids);
  }

  seedFromFoods(foods: Food[]): void {
    if (this.favoriteIds.getValue().size === 0) {
      const ids = new Set(foods.filter(f => f.favorite).map(f => f.id));
      if (ids.size > 0) {
        this.favoriteIds.next(ids);
        this.saveToStorage(ids);
      }
    }
  }
}
