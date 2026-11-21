import { DecimalPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  readonly product = signal<Product | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly added = signal(false);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Không tìm thấy sản phẩm hoặc kết nối API thất bại.');
        this.loading.set(false);
      },
    });
  }

  addToCart(): void {
    const product = this.product();
    if (!product) {
      return;
    }

    this.cartService.add(product);
    this.added.set(true);
  }
}
