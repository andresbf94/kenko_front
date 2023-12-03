import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { serverRoute } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class MailService {
  
  baseUrl = serverRoute + '/api/mails';

  constructor(private http: HttpClient) { }

  sendConfimationMail(reserva:any){
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}`, reserva)
    )
  }
  
}
