import { Injectable } from '@angular/core';
import { CartaComponent } from '../carta/carta.component';
import { Carta } from '../models/carta';

@Injectable({
  providedIn: 'root'
})
export class MazoService {
  
  mazo : Carta[];

  constructor() { 

  }

  palos:string[] = ['c', 'p', 'd', 't'];
  valores:number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13
  ];


  crearMazo():Carta[] {
    this.mazo = [];
    for (let paloIdx = 0; paloIdx < this.palos.length; paloIdx++) {
      for (let valorIdx = 0; valorIdx < this.valores.length; valorIdx++) {
        let palo = this.palos[paloIdx];
        let valor = this.valores[valorIdx];
        let esAs = false;
        if(valor == 1){
          esAs = true;
        }
        let carta = new Carta(palo,valor,esAs); 
        this.mazo.push(carta);
      }
    }
    return this.mazo;
  }

  sacarCarta() {
    //step 1, extract a random card from the remaining ones in the pack
    let indiceRandom = Math.floor(Math.random() * (this.mazo.length + 1)) + 0;
    let carta = this.mazo[indiceRandom];
    if (carta === undefined)
    {
      carta = this.sacarCarta();
    }
    this.mazo.splice(indiceRandom, 1);
    return carta;
  }

}

