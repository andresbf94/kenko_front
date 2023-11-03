import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { serverRoute } from 'src/app/app.component';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {

  serverUrl = serverRoute;
  carrito: any = [];
  productos: any = [];
  usuario: any = [];
  categoriasProductos: { [key: string]: any[] } = {};

  constructor(private productoService: ProductosService) {
  }

  ngOnInit() {
    this.obtenerProductos();
    
  }

  obtenerProductos() {
    this.productoService.getAll().subscribe({
      next: data => {
        this.productos = data;
        this.organizarProductos(this.productos);
        console.log('productos organizados:', this.categoriasProductos);
      },
      error: error => {
        console.error('Error al recuperar los productos: ', error);
      }
    });
  }

  organizarProductos(productos: any) {
    productos.forEach((producto: any) => {
      if (!this.categoriasProductos[producto.categoria]) {
        this.categoriasProductos[producto.categoria] = [];
      }
      this.categoriasProductos[producto.categoria].push(producto);
    });
  }
}





