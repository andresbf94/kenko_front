import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {

  formulario: FormGroup;
  mensaje: string = '';
  reservaRealizada=  false;

  constructor( private reservasService:ReservasService, fb:FormBuilder, private mailService: MailService){
    this.formulario = fb.group({
      nombre: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      numPer: ['',[Validators.required]],
      hora: ['',[Validators.required]],
      fecha: ['',[Validators.required]],
      observaciones: ['']
    })
  }

  async onSubmit() {
    if(this.formulario.valid){
      try {
        const response = await this.reservasService.create(this.formulario.value);
        console.log('response', response)
        if(response){
          this.mailService.sendConfimationMail(this.formulario.value);
          this.reservaRealizada = true;
        }
            
      } catch (error) {
        this.mensaje = 'Lo sentimos, el aforo maximo ha sido alcanzado';
      }
    } 
  }

  eliminarMensaje(){
    this.mensaje = '';
  }

}
