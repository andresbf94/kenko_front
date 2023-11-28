import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartaComponent } from './views/carta/carta.component';
import { ReservasComponent } from './views/reservas/reservas.component';
import { InformacionComponent } from './views/informacion/informacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipDelayComponent } from './components/tooltip-delay/tooltip-delay.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './views/auth/register/register.component';
import { LoginComponent } from './views/auth/login/login.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './views/perfil-admin/perfil-admin.component';
import { CarritoComponent } from './views/carrito/carrito.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    CartaComponent,
    ReservasComponent,
    InformacionComponent,
    TooltipDelayComponent,
    RegisterComponent,
    LoginComponent,
    PerfilUsuarioComponent,
    PerfilAdminComponent,
    CarritoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgbNavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Obtén el token de localStorage
        allowedDomains: ['example.com'], // Dominios permitidos (opcional)
        disallowedRoutes: ['example.com/login'], // Rutas excluidas (opcional)
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
