import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit{

  pedidos: any = [];

  constructor(private pedidosService: PedidosService, public usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidosService.getPedidos().subscribe(
      (data: any) => {
        this.pedidos = data;
        console.log('pedidos', this.pedidos);
      },
      (error: any) => {
        console.error('Error al obtener pedidos:', error);
      }
    );
  }

  getUserById(userId: string): Observable<string> {
    return this.usuariosService.getUsers().pipe(
      map((users: Usuario[]) => {
        const user = users.find(user => user._id === userId);
        return user ? user.nombre : 'Usuario no encontrado';
      })
    );
  }
}