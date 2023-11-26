import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseUrl = 'http://localhost:4000/api/pedidos';

  constructor(private httpClient: HttpClient, private usuariosService: UsuariosService) { }

  enviarPedido(pedido:any){
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, pedido)
    );  
  }
  
  getPedidos(): Observable<any> {
    return this.httpClient.get(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener pedidos:', error);
        return throwError(error);
      })
    );
  }
  getPedidoById(id:any){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${id}`)
    );
  }

  getPedidosByUserId(){
    const idUsuario = this.usuariosService.getUserID();
    return this.httpClient.get<any>(`${this.baseUrl}/usuario/${idUsuario}`)
  }

}
