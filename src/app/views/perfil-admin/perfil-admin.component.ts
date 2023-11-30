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
  importesPedidos:any = [];

  constructor(
    public pedidosService: PedidosService, 
    public usuariosService: UsuariosService,
    public reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.obtenerReservas();
    this.obtenerPedidos();
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

  obtenerPedidos(){
    forkJoin({
      pedidos: this.pedidosService.getPedidos(),
      usuarios: this.usuariosService.getUsers()
    }).subscribe(
      ({ pedidos, usuarios }) => {
        this.pedidos = pedidos;
        this.usuarios = usuarios;
        console.log('pedidos', this.pedidos)
        this.calcular();
      },
      (error: any) => {
        console.error('Error al obtener datos:', error);
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
          this.obtenerPedidos();
        },
        (error: any) => {
          console.error('Error al eliminar pedido:', error);
        }
      );
    }
  }

  obtenerImporte() {
    const idsProductos: any[] = [];

    this.pedidos.forEach((pedido:any) => {
     pedido.producto.forEach((producto:any) => {
        idsProductos.push(producto.id);
     });
    });
    console.log('arrayids', idsProductos);
  }

  calcularImporteTotal(pedido:any) {
    // Utilizamos la función reduce para sumar los precios de todos los productos en el pedido
    const importeTotal = pedido.productos.reduce((total:any, producto:any) => {
      // Accedemos al precio a través de la propiedad producto
      return total + producto.producto.precio * producto.unidades;
    }, 0); // El segundo parámetro de reduce es el valor inicial, en este caso, 0
  
    return importeTotal;
  }

  calcular(){
    this.pedidos.forEach((pedido: any, index: number) => {
    const importeTotalPedido = this.calcularImporteTotal(pedido);
    console.log(`Importe total del Pedido ${index + 1}: $${importeTotalPedido}`);
    });
  }
  
  
  
}