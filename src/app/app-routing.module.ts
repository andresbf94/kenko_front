import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';
import { CartaComponent } from './views/carta/carta.component';
import { ReservasComponent } from './views/reservas/reservas.component';
import { InformacionComponent } from './views/informacion/informacion.component';

const routes: Routes =[

  { path: '', component: InicioComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'reservas', component: ReservasComponent},
  { path: 'informacion', component: InformacionComponent}

  
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
