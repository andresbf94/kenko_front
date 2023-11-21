import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit{

  constructor(private pedidosService:PedidosService, public productosService:ProductosService){}

  pedidos:any = [];


  ngOnInit(): void {
    this.obtenerPedidos();
  }
  obtenerPedidos(){
    this.pedidosService.getPedidosByUserId().subscribe(
      (data:any) => {
        this.pedidos = data;
      }),
      (error:any) => {
        console.error('Error al obtener pedidos', error);
      }
  }

  formatDate(date: string): string {
    return format(new Date(date), 'dd/MM/yyyy', { locale: es });
  }

}
