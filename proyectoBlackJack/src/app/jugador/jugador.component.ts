import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carta } from '../models/carta';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  
  @Output() onPlantar = new EventEmitter();
  
  mano:Carta[]=[];
  carta:Carta;
  puntaje:number= 0;
  resultado:number = 0; // 0 jugada en proceso | 1 blackjack | 2 se paso o paro
  habilitarPedido:boolean = true;
  

  constructor(private servicioMazo:MazoService) {
    
   }

  ngOnInit(): void {
    this.pedirCarta();
    this.pedirCarta();
    
  }

  pedirCarta(){
    this.carta=this.servicioMazo.sacarCarta()
    this.mano.push(this.carta);
    this.calcularPuntaje();
    if(this.puntaje == 21){
      this.habilitarPedido = false;
      this.plantarJugada();      
    }
    if(this.puntaje > 21){
      this.resultado = 2;
      this.habilitarPedido = false;
      
    }  


  }

  plantarJugada(){
    this.calcularPuntaje();
    this.resultado = 2;
    this.habilitarPedido = false;    
    this.onPlantar.emit(this.puntaje);
    
  }

  
  calcularPuntaje(){
    this.puntaje = 0;
    let tieneAs = false;

    for( let i =0 ; i < this.mano.length ; i++ ){
      if(this.mano[i].valor>10){ // para J, Q y K
        this.puntaje +=10;
      } else {
        this.puntaje += this.mano[i].valor;
      }
      if(this.mano[i].esAs){
        tieneAs = true
      }
    }
    if(tieneAs && this.puntaje + 10 <=21){
      this.puntaje += 10;
    }  

  }

}
