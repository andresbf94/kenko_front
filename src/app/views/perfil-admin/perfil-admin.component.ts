import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {
  active = 'pedidos';
  pedidos: any = [];
  usuarios: any = [];
  reservas: any = [];
  reservasHoy: any = [];

  constructor(
    public pedidosService: PedidosService, 
    public usuariosService: UsuariosService,
    public reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.obtenerReservas();
    forkJoin({
      pedidos: this.pedidosService.getPedidos(),
      usuarios: this.usuariosService.getUsers()
    }).subscribe(
      ({ pedidos, usuarios }) => {
        this.pedidos = pedidos;
        this.usuarios = usuarios;
      },
      (error: any) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  obtenerNombreUsuario(userId: string): string {
    const usuario = this.usuarios.find((u: { _id: string; }) => u._id === userId);
    return usuario ? usuario.nombre : 'Usuario no encontrado';
  }

  cambiarPestana(pestana: string) {
    this.active = pestana;
  }

  obtenerReservas() {
    this.reservasService.getAll().subscribe(
      (data: any) => {
        this.reservas = data;
        console.log('reservas', this.reservas);
        this.filtrarReservasHoy();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getFormattedCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  filtrarReservasHoy() {
    const fechaHoy = this.getFormattedCurrentDate();
    console.log('fechaHoy', fechaHoy);
    this.reservasHoy = this.reservas.filter((reserva: any) => reserva.fecha.split('T')[0] === fechaHoy);
  }

  editarPedido(pedidoId: string) {
    // Aquí debes implementar la lógica para abrir un formulario de edición con el pedido correspondiente.
    // Puedes utilizar un servicio para comunicarte con otros componentes o un modal para mostrar el formulario.
    console.log('Editar pedido con ID:', pedidoId);
  }

  eliminarPedido(pedidoId: string) {
    // Aquí debes implementar la lógica para confirmar la eliminación del pedido y luego llamar al servicio para eliminarlo.
    if (confirm('¿Seguro que quieres eliminar este pedido?')) {
      this.pedidosService.deletePedido(pedidoId).subscribe(
        (data: any) => {
          console.log('Pedido eliminado:', data);
          // Actualizar la lista de pedidos después de eliminar
          this.actualizarListaPedidos();
        },
        (error: any) => {
          console.error('Error al eliminar pedido:', error);
        }
      );
    }
  }

  actualizarListaPedidos() {
    // Actualizar la lista de pedidos después de editar o eliminar un pedido.
    this.pedidosService.getPedidos().subscribe(
      (data: any) => {
        this.pedidos = data;
      },
      (error: any) => {
        console.error('Error al obtener pedidos:', error);
      }
    );
  }
}