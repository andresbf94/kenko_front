import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario : FormGroup;
  respuestaBD : string = '' ;

  constructor(fb: FormBuilder, private usuariosService:UsuariosService, private router:Router){
    this.formulario = fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required]]
    })
  }

  async onSubmit(){
    const response = await this.usuariosService.register(this.formulario.value);
    this.respuestaBD= response.error;
    if(!response.error){
      localStorage.setItem('token', response.token);
      console.log('objeto', response);
      this.router.navigate(['/perfil-usuario']);
    }
  }
}
