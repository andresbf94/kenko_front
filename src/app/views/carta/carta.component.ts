import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {

carrito:any=[];
productos: any = [];
usuario:any =[];

  constructor (private productoService: ProductosService ){
  }
  
  ngOnInit(){
    this.productoService.getAll().subscribe(
      {
        next: resp =>{
          this.productos = resp;
          console.log(this.productos)
        },
        error: error=>{
          console.error('Error al recuperar los productos: ', error) 
        }
      });
  }

}
