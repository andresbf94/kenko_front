import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: any = []
  p: number = 1;
  itemsPerPage = this.carritoService.carrito.length;
  direccionEnvio: string = '';
  tokenUsuario = this.usuariosService.getToken();
  idUsuario = this.usuariosService.getUserID();
  datosUsuario= [];
  
  constructor(
    public carritoService: CarritoService, 
    private usuariosService: UsuariosService,
    private pedidosService: PedidosService 
  ) {}

  ngOnInit(): void {

    this.usuariosService.getUserById(this.idUsuario, this.tokenUsuario).subscribe((data:any) =>{
      console.log('data', data);
      this.datosUsuario = data;
    })

  }

  enviarPedido() {
    const idUsuario = this.usuariosService.getUserID()!;
    const pedido = {
      users_id: idUsuario,
      direccionEntrega: this.direccionEnvio,
      productos: this.carritoService.carrito,
    }

    this.pedidosService.enviarPedido(pedido);
  }

}
