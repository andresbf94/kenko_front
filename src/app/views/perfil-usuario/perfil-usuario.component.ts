import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UsuariosService } from '../../services/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  pedidos: any = [];
  usuario: any;
  editando = false;
  nuevaContrasena = '';
  formulario!: FormGroup ;

  constructor(
    private pedidosService: PedidosService,
    public productosService: ProductosService,
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.getUserData();
  }

  getUserData() {
    this.usuariosService.getUserById().subscribe(
      (data: any) => {
        this.usuario = data;
        this.inicializarFormulario();
        this.obtenerPedidos();
        console.log('usuario', this.usuario);
      },
      (error: any) => {
        console.error('Error al cargar los datos del usuario', error);
      });
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: [this.usuario?.nombre || '', [Validators.required, Validators.minLength(3)]],
      email: [this.usuario?.email || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: [this.usuario?.telefono || '', [Validators.minLength(9), Validators.maxLength(15), Validators.pattern(/^[0-9]*$/)]],
      direccion: [this.usuario?.direccion || '', [Validators.required]]
    });
  }

  edicion() {
    if(this.editando=== true){
      this.editando = false;
      return
    }
    this.editando =true;
  }
  
  obtenerPedidos() {
    this.pedidosService.getPedidosByUserId().subscribe(
      (data: any) => {
        this.pedidos = data;
      },
      (error: any) => {
        console.error('Error al obtener pedidos', error);
      }
    );
  }

  formatDate(date: string): string {
    return format(new Date(date), 'dd/MM/yyyy', { locale: es });
  }

  async guardarCambios() {
    try {
      // Verifica la validez del formulario antes de enviarlo
      if (this.formulario.invalid) {
        // Marca todos los campos como "touched" para mostrar mensajes de error
        this.marcarCamposComoTouched();
        return;
      }

      const response = await this.usuariosService.updateUser(this.formulario.value);
      this.edicion();
      console.log('respuesta', response);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Puedes manejar el error aquí según tus necesidades
    }
  }

  private marcarCamposComoTouched() {
    Object.values(this.formulario.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}