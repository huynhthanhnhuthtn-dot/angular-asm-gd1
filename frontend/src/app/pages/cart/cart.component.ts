import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, AsyncPipe, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  readonly items$: Observable<CartItem[]>;
  readonly total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.items$;
    this.total$ = this.cartService.total$;
  }

  increase(id: string): void {
    this.cartService.increase(id);
  }

  decrease(id: string): void {
    this.cartService.decrease(id);
  }

  remove(id: string): void {
    this.cartService.remove(id);
  }
}
