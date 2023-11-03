import { Component, inject } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 
 usuariosService = inject(UsuariosService);

}
