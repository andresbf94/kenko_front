import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  baseUrl = 'http://localhost:4000/api/productos';

  constructor(private httpClient: HttpClient) { }

  // Funcion para obtener todos los productos

  getAll() {
    return this.httpClient.get(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  //Funcion para obtener un solo producto a partir de su id

  getById(productoId: string) {
    const url = `${this.baseUrl}/${productoId}`;
    return this.httpClient.get(url).pipe(
      catchError(this.handleError)
    );
  }

  //Funcion para el manejo de errores

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Error del lado del servidor (código ${error.status}): ${error.error}`);
    }
    return throwError('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
  }
}