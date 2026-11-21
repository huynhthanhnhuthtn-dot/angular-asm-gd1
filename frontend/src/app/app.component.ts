import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly cartCount$: Observable<number>;

  constructor(cartService: CartService) {
    this.cartCount$ = cartService.items$.pipe(
      map((items) => items.reduce((sum, item) => sum + item.quantity, 0)),
    );
  }
}
