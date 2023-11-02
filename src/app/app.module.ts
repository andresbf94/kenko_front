import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductosDetailComponent } from './components/productos/productos-detail/productos-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartaComponent } from './views/carta/carta.component';
import { ReservasComponent } from './views/reservas/reservas.component';
import { InformacionComponent } from './views/informacion/informacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductosListComponent,
    ProductosDetailComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    CartaComponent,
    ReservasComponent,
    InformacionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
