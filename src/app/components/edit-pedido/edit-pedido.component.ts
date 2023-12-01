import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.css']
})
export class EditPedidoComponent implements OnInit {
  editForm: FormGroup | any;
  selectedPedido: any;
  pedidoId: string = '';
  listaProductos:any = [];

  constructor(
    private pedidosService: PedidosService,
    private formBuilder: FormBuilder,
    private productosService: ProductosService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // Utiliza el pedidoId para cargar el pedido
    this.pedidosService.getPedidoById(this.pedidoId).subscribe(
      (pedido:any) => {
        this.selectedPedido = pedido;
        console.log('pedidoselect', this.selectedPedido)
        this.initializeForm();
      },
      (error:any) => {
        console.error('Error al obtener el pedido:', error);
      }
    );

    this.productosService.getAll().subscribe(
      (data:any) => {
        this.listaProductos = data;
      },
      (error:any) =>{
        console.error('Error al obtener los productos');
      }
    )
   
    console.log('id', this.pedidoId);
  }

  initializeForm() {
    this.editForm = this.formBuilder.group({
      user_id: [this.selectedPedido.user_id, Validators.required],
      direccion: [this.selectedPedido.direccion, Validators.required],
      estado: [this.selectedPedido.estado || 'enviado'],
      productos: this.formBuilder.array([])
    });
  
    const productosFormArray = this.editForm.get('productos') as FormArray;
    productosFormArray.clear();
  
    this.selectedPedido.productos.forEach((producto: any) => {
      const productoFormGroup = this.formBuilder.group({
        producto: this.formBuilder.group({
          nombre: [producto.producto.nombre, Validators.required],
          descripcion: [producto.producto.descripcion, Validators.required],
          precio: [producto.producto.precio, Validators.required],
          imagen: [producto.producto.imagen, Validators.required],
          categoria: [producto.producto.categoria, Validators.required],
        }),
        unidades: [producto.unidades, Validators.required]
      });
  
      productosFormArray.push(productoFormGroup);
    });

    this.editForm.addControl('nuevoProducto', new FormControl(null));
    this.editForm.addControl('unidadesNuevoProducto', new FormControl(null));
  }

  onSubmit() {
    const updatedPedido = { ...this.selectedPedido, ...this.editForm.value };
    console.log('updatedpedido', updatedPedido)
    this.pedidosService.updatePedido(updatedPedido).subscribe(
      (updatedPedidoResponse) => {
        // Maneja la respuesta después de la actualización
        console.log('Pedido actualizado con éxito:', updatedPedidoResponse);
      },
      (error) => {
        // Maneja errores durante la actualización
        console.error('Error al actualizar el pedido:', error);
      }
    );
  }

  anadirProducto() {
    const nuevoProductoId = this.editForm.get('nuevoProducto').value;
    const unidadesNuevoProducto = this.editForm.get('unidadesNuevoProducto').value;
  
    // Obtén los detalles del producto de la lista de productos
    const nuevoProducto = this.listaProductos.find((producto:any) => producto._id === nuevoProductoId);
  
    // Crea el FormGroup para el nuevo producto
    const nuevoProductoFormGroup = this.formBuilder.group({
      producto: this.formBuilder.group({
        nombre: [nuevoProducto.nombre, Validators.required],
        descripcion: [nuevoProducto.descripcion, Validators.required],
        precio: [nuevoProducto.precio, Validators.required],
        imagen: [nuevoProducto.imagen, Validators.required],
        categoria: [nuevoProducto.categoria, Validators.required],
      }),
      unidades: [unidadesNuevoProducto, Validators.required],
    });
  
    // Agrega el FormGroup a la FormArray de productos
    const productosFormArray = this.editForm.get('productos') as FormArray;
    productosFormArray.push(nuevoProductoFormGroup);
  
    // Limpia los controles después de añadir el producto
    this.editForm.get('nuevoProducto').setValue(null);
    this.editForm.get('unidadesNuevoProducto').setValue(null);
  }
  // Método para eliminar un producto del formulario
  eliminarProducto(index: number) {
    const productosFormArray = this.editForm.get('productos') as FormArray;
    productosFormArray.removeAt(index);
  }
  // Método para crear un FormGroup para un producto
  crearProductoFormGroup(): FormGroup {
    return this.formBuilder.group({
      producto: this.formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        imagen: ['', Validators.required],
        categoria: ['', Validators.required],
      }),
      unidades: ['', Validators.required]
    });
  }

  closeModal(){
    this.activeModal.close();
  }
}