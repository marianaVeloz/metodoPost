import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService, Producto } from './services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  producto: Producto = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  };

  respuesta: Producto | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private productService: ProductService) {}

  guardarProducto() {
    this.errorMessage = '';
    this.successMessage = '';
    this.respuesta = null;
    this.loading = true;

    this.productService.agregarProducto(this.producto).subscribe({
      next: (data) => {
        this.respuesta = data;
        this.successMessage = 'Producto agregado correctamente';
        this.loading = false;

        this.producto = {
          title: '',
          price: 0,
          description: '',
          image: '',
          category: ''
        };
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al guardar el producto';
        this.loading = false;
      }
    });
  }
}