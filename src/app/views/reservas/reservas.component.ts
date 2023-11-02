import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReservasService } from 'src/app/service/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {

  formulario: FormGroup;
  mensaje: string = '';

  constructor( private reservasService:ReservasService, fb:FormBuilder){
    this.formulario = fb.group({
      nombre: ['', [Validators.required]],
      correo: ['',[Validators.required]],
      numPer: ['',[Validators.required]],
      hora: ['',[Validators.required]],
      fecha: ['',[Validators.required]],
      observaciones: ['']
    })
  }

  async onSubmit() {
    if(this.formulario.valid){
      try {
        const response = await this.reservasService.create(this.formulario.value)
        console.log(response)
        this.mensaje = 'Reserva realizada con exito';       
      } catch (error) {
        this.mensaje = 'Lo sentimos, el aforo maximo ha sido alcanzado';
      }
    } 
  }

  eliminarMensaje(){
    this.mensaje = '';
  }

}
