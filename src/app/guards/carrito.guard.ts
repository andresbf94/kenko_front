import { inject } from "@angular/core"
import { CarritoService } from "../services/carrito.service"

export const carritoGuard = () => {

   const carritoService = inject(CarritoService);

   if(carritoService.carrito.length === 0){
    return false;
   } else {
    return true;
   }

}