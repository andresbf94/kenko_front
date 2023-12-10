import { Injectable } from "@angular/core";
import { Producto } from "../models/producto.model";
import { serverRoute } from "../app.component";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: any[] = [];
  total: number = 0;
  url: string = serverRoute + '/api/pagos';

  constructor( private http: HttpClient) { }
  
  agregar(producto: Producto, unidades: number) {
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = this.carrito.find((item: any) => item.producto._id === producto._id);

    if (unidades > 0) {
      if (productoEnCarrito) {
        // Si ya está en el carrito, actualizar la cantidad
        productoEnCarrito.unidades += unidades;
      } else {
        // Si no está en el carrito, agregarlo
        const productoAgregado = { producto, unidades };
        this.carrito.push(productoAgregado);
      }
    }
    this.calcularTotal();
  }

  eliminar(producto: Producto, unidades: number) {
    // Buscar el producto en el carrito
    const productoEnCarrito = this.carrito.find((item: any) => item.producto._id === producto._id);

    if (productoEnCarrito) {
      // Restar las unidades del carrito
      productoEnCarrito.unidades -= unidades;
      if (productoEnCarrito.unidades <= 0) {
        // Si la cantidad es menor o igual a cero, eliminar el producto del carrito
        const index = this.carrito.indexOf(productoEnCarrito);
        if (index !== -1) {
          this.carrito.splice(index, 1);
        }
      }
    }
    this.calcularTotal();
  }

  calcularTotal(){
    this.total = 0;
    this.carrito.forEach((item:any) =>{
      this.total += item.producto.precio * item.unidades;
    })
  }

  pagarEnStripe(totalAmount: number): Observable<string> {
    const body = { totalAmount };
    console.log('cuerpo', body);
    return this.http.post<string>(`${this.url}`, body);
  }

}


