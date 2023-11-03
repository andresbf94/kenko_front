import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private fb:FormBuilder, private usuariosService:UsuariosService){
    this.formulario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['',[Validators.required]]
    })
  }

  async onSubmit(){
    const response = await this.usuariosService.login(this.formulario.value);
    console.log(response);
  }
}
