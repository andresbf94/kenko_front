import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { serverRoute } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseUrl = serverRoute + '/api/pedidos';

  constructor(private http: HttpClient, private usuariosService: UsuariosService) { }

  enviarPedido(pedido:any){
    return firstValueFrom(
      this.http.post<any>(this.baseUrl, pedido)
    );  
  }
  
  getPedidos(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener pedidos:', error);
        return throwError(error);
      })
    );
  }
  
  getPedidoById(id:any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getPedidosByUserId(){
    const idUsuario = this.usuariosService.getUserID();
    return this.http.get<any>(`${this.baseUrl}/usuario/${idUsuario}`);
  }
  
  deletePedido(pedidoId:any): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${pedidoId}`);
  }

  updatePedido(pedido:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${pedido._id}`, pedido);
  }
}
