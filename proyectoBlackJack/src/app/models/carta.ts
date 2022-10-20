export class Carta {
  palo:string;
  valor:number;
  esAs:boolean;

  constructor(palo:string,valor:number,esAs:boolean) {
    this.palo = palo;
    this.valor = valor;
    this.esAs =  esAs;
  }
}
