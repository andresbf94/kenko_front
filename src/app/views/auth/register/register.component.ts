import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario: FormGroup;
  respuestaBD: string = '';

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private router: Router) {
    this.formulario = fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      telefono: ['', [Validators.minLength(9), Validators.maxLength(15), Validators.pattern(/^[0-9]*$/)]],
      direccion: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    // Verifica la validez del formulario antes de enviarlo
    if (this.formulario.invalid) {
      // Marca todos los campos como "touched" para mostrar mensajes de error
      this.marcarCamposComoTouched();
      return;
    }

    const response = await this.usuariosService.register(this.formulario.value);
    this.respuestaBD = response.error;

    if (!response.error) {
      localStorage.setItem('token', response.token);
      console.log('objeto', response);
      this.router.navigate(['/perfil-usuario']);
    }
  }

  // Marca todos los campos como "touched"
  private marcarCamposComoTouched() {
    Object.values(this.formulario.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}