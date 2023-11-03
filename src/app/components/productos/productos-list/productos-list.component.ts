import { Component } from '@angular/core';
import { ProductosDetailComponent } from '../productos-detail/productos-detail.component';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent {

  productos= new Array;
  
  constructor (private productoService: ProductosService ){
  }
  
  ngOnInit(){
    this.productoService.getAll().subscribe(
      {
        next: resp =>{
          console.log(resp);
        },
        error: error=>{
          console.error('Error al recuperar los productos: ', error) 
        }
      });
  }
}
