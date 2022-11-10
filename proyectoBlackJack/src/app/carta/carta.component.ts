import { Component, Input, OnInit } from '@angular/core';
import { Carta } from '../models/carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  @Input() mano: Carta[];

  constructor() { }

  ngOnInit(): void {
  }

  ubicarImagen(carta:Carta): string{
    let palo = carta.palo
    let valor = carta.valor
    return "https://raw.githubusercontent.com/GRetamal26/tpBlackJack2w1/1ra-Entrega/proyectoBlackJack/src/assets/" + palo + valor + ".png";
  }


}
