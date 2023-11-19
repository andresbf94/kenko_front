import { Component, inject } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  usuariosService = inject(UsuariosService);
  carritoService = inject(CarritoService);
}
