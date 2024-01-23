import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';
import { CartaComponent } from './views/carta/carta.component';
import { ReservasComponent } from './views/reservas/reservas.component';
import { InformacionComponent } from './views/informacion/informacion.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { LoginComponent } from './views/auth/login/login.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { usuarioGuard } from './guards/usuario.guard';
import { PerfilAdminComponent } from './views/perfil-admin/perfil-admin.component';
import { CarritoComponent } from './views/carrito/carrito.component';
import { carritoGuard } from './guards/carrito.guard';
import { adminGuard } from './guards/admin.guard';
import { PedidoRealizadoComponent } from './components/pedido-realizado/pedido-realizado.component';

const routes: Routes =[

  { path: '', component: InicioComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'reservas', component: ReservasComponent},
  { path: 'informacion', component: InformacionComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [usuarioGuard]},
  { path: 'perfil-admin', component: PerfilAdminComponent, canActivate: [adminGuard]},
  { path: 'carrito', component: CarritoComponent, canActivate: [usuarioGuard, carritoGuard]},
  { path: 'pedido-realizado', component: PedidoRealizadoComponent}
  
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [
    RouterModule
  ]
})

export class AppRoutingModule { }
