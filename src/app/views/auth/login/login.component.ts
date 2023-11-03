import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  pantallaPequeña = false;

  constructor(fb:FormBuilder, private usuariosService:UsuariosService, private router:Router){
    this.formulario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  async onSubmit(){
    const response = await this.usuariosService.login(this.formulario.value);

    if(!response.error){
        localStorage.setItem('token', response.token);
   
        if(response.rol === 'regular'){
          this.router.navigate(['/perfil-usuario']);
        } else {
          this.router.navigate(['/perfil-admin']);
        }
        
    }
  }

  
}
