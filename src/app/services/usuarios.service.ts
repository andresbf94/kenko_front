import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient, private router:Router) { }

  register(formValue:any ){
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/register`, formValue)
    )
  }
  login(formValue:any ){

    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/login`, formValue)
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  
  isAuth(){
    return localStorage.getItem('token') ? true : false;
  }

  getUserID(): string | null {
    const token = localStorage.getItem('token');
    console.log('token', token)
    if (token) {
      const tokenData: any = jwtDecode(token);
      console.log('tokendata', tokenData)
      return tokenData.id;
    } else {
      return null; // Devuelve null si el token no existe
    }
  }
}
