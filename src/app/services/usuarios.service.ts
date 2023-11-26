import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient, private router:Router) { }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

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

  getUserById(): Observable<any> {
    const token = this.getToken();
    const id = this.getUserID();

    const headers = new HttpHeaders({
      'Authorization': token, 
    })
    // Agrega el encabezado a la solicitud HTTP
    const options = {headers: headers};
     // Realiza la solicitud GET con el encabezado de autorización
    return this.http.get(`${this.baseUrl}/${id}`, options)
  }
 
  getToken():any {
    return localStorage.getItem('token');
  }

  getUserID(): any {
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

  updateUser(formValue:any):any {
    const token = this.getToken();
    const id = this.getUserID();
    
    const headers = new HttpHeaders({
      'Authorization': token, 
    })
    // Agrega el encabezado a la solicitud HTTP
    const options = {headers: headers};
  
    let usuario = {
      nombre: formValue.nombre,  
      email: formValue.email,
      password: formValue.password,
      direccion: formValue.direccion,
      telefono: formValue.telefono,
    } 
    console.log('usuarioModificadoService', usuario);
    return firstValueFrom(
      this.http.put<any>(`${this.baseUrl}/${id}`, usuario, options)
    )
  }
}
