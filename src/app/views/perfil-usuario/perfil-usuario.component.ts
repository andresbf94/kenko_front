import { Component } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {

  constructor(private usuarioService: UsuariosService, private pedidosService:PedidosService){}

  pedidos:any = [];

  obtenerPedidos(){
    this.usuarioService.getUserID
  }

}
