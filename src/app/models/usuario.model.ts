export class Usuario {
    constructor(
      public _id: string,
      public nombre: string,
      public email: string,
      public password: string,
      public direccion: string,
      public telefono: number,
      public rol: string = 'regular'
    ) {}
  }