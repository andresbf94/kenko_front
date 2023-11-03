import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  baseUrl = 'http://localhost:4000/api/reservas';

  constructor(private httpClient: HttpClient) { }

  // Funcion para obtener todas las reservas

  getAll() {
    return this.httpClient.get(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  //Funcion para obtener una reserva a partir de su id

  getById(reservaId: string) {
    const url = `${this.baseUrl}/${reservaId}`;
    return this.httpClient.get(url).pipe(
      catchError(this.handleError)
    );
  }

  create(formValues: any){ 
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, formValues)
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
