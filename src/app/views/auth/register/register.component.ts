import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario : FormGroup; 

  constructor(fb: FormBuilder, private userService:UsuariosService){
    this.formulario = fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contraseña:  ['', [Validators.required]]
    })
  }

  async onSubmit(){
    const response = await this.userService.register(this.formulario.value);
    console.log(response);
  }
}
