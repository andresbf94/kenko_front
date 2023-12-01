import { Usuario } from './usuario.model';
import { Producto } from './producto.model';

export class Pedido {
  constructor(
    public _id: string,
    public user_id: string,
    public direccion: string,
    public estado: string,
    public productos: { producto: Producto, unidades: number }[]
  ) {}
  
}