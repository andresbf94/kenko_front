import { Component, OnInit, inject } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
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
  itemsPerPage = 10;
  direccionEnvio: string = '';
  
  constructor(
    public carritoService: CarritoService, 
    private usuariosService: UsuariosService,
    private pedidosService: PedidosService 
  ) {}

  ngOnInit(): void {
    console.log('id', this.usuariosService.getUserID());
    console.log('carro', this.carritoService.carrito);
  }

  enviarPedido() {
    const idUsuario = this.usuariosService.getUserID()!;
    const pedido = {
      users_id: idUsuario,
      direccionEntrega: this.direccionEnvio,
      productos: this.carritoService.carrito
    }

    this.pedidosService.enviarPedido(pedido);
  }


}
