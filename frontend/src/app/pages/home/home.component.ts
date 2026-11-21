import { DecimalPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products.slice(0, 4));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Không tải được sản phẩm. Kiểm tra kết nối API.');
        this.loading.set(false);
      },
    });
  }
}
