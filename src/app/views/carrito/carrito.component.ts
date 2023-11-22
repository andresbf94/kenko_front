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
  tokenUsuario = this.usuariosService.getToken();         
  idUsuario = this.usuariosService.getUserID();
  pedidoEnviado = false;
  
  constructor(
    public carritoService: CarritoService, 
    private usuariosService: UsuariosService,
    private pedidosService: PedidosService 
  ) {}

  ngOnInit(): void {

  }
  // Obtiene los datos del usuario autenticado y los envia junto con los del carrito para la creacion de un pedido 
  async enviarPedido() {
    try {
      const userData = await this.usuariosService.getUserById().toPromise();

      this.pedido = {
        user_id: userData._id,
        direccion: userData.direccion,
        productos: this.carritoService.carrito  
      };

      await this.pedidosService.enviarPedido(this.pedido);
      this.carritoService.carrito = []; // Pongo a cero el carrito
      this.pedidoEnviado = true;
    } catch (error) {
      console.error('Error al obtener los datos del usuario o enviar el pedido', error);
    }
  }
}
