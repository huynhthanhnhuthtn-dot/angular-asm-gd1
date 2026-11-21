import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'accessories_cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadItems());

  readonly items$ = this.itemsSubject.asObservable();
  readonly total$ = this.items$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)),
  );

  add(product: Product): void {
    const items = [...this.itemsSubject.value];
    const index = items.findIndex((item) => item.product._id === product._id);

    if (index >= 0) {
      items[index] = { ...items[index], quantity: items[index].quantity + 1 };
    } else {
      items.push({ product, quantity: 1 });
    }

    this.update(items);
  }

  increase(id: string): void {
    this.changeQuantity(id, 1);
  }

  decrease(id: string): void {
    this.changeQuantity(id, -1);
  }

  remove(id: string): void {
    this.update(this.itemsSubject.value.filter((item) => item.product._id !== id));
  }

  private changeQuantity(id: string, step: number): void {
    const items = this.itemsSubject.value
      .map((item) => (item.product._id === id ? { ...item, quantity: item.quantity + step } : item))
      .filter((item) => item.quantity > 0);

    this.update(items);
  }

  private update(items: CartItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private loadItems(): CartItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return [];
    }

    try {
      const items = JSON.parse(data) as CartItem[];
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }
}
