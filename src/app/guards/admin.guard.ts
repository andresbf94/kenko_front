import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

export const adminGuard = () =>{

    const router = inject(Router)

    const token = localStorage.getItem('token');
    
    if (token) {
      const tokenData: any = jwtDecode(token);
      console.log('token', tokenData.rol)
        if (tokenData.rol === 'admin') {
            return true; 
        }
        router.navigate(['/login']);
        return false;
    }
    router.navigate(['/login']);
    return false;
    
  }


