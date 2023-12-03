import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, firstValueFrom, Observable } from 'rxjs';
import { serverRoute } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  baseUrl = serverRoute + '/api/reservas';

  constructor(private httpClient: HttpClient) { }

  // Funcion para obtener todas las reservas

  getAll(): Observable<any> {   
      return this.httpClient.get(this.baseUrl);  
  }

  //Funcion para obtener una reserva a partir de su id

  getById(reservaId: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${reservaId}`)
    );
  }

  create(formValues: any){ 
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, formValues)
    );
  }
  //Funcion para el manejo de errores

  
}
