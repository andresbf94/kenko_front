export class Reserva {
    constructor(
      public _id: string,
      public nombre: string,
      public correo: string,
      public numPer: number,
      public hora: string,
      public fecha: Date,
      public observaciones: string
    ) {}
  }