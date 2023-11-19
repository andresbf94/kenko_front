import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  baseUrl = 'http://localhost:4000/api/mails';

  constructor(private http: HttpClient) { }

  sendConfimationMail(reserva:any){
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}`, reserva)
    )
  }
  
}
