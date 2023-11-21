import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
  
  getPedidos(){
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
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
