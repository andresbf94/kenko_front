export class Producto {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public imagen: string,
    public categoria: string
  ) {}
}