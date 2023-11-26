import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

export const usuarioGuard = () =>{

    const router = inject(Router)

    const token = localStorage.getItem('token');
    console.log('token', token)
    if (token) {
      const tokenData: any = jwtDecode(token);

        if (tokenData.rol === 'regular') {
            return true; 
        }
        router.navigate(['/login']);
        return false;
    }
    router.navigate(['/login']);
    return false;
    
}




