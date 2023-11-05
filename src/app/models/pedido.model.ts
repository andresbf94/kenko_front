import { Usuario } from './usuario.model';
import { Producto } from './producto.model';

export class Pedido {
  constructor(
    public _id: string,
    public users_id: string,
    public direccionEntrega: string,
    public estado: string,
    public productos: { producto: Producto, unidades: number }[]
  ) {}
  
}