import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorComponent } from '../jugador/jugador.component';
import { Carta } from '../models/carta';
import { MazoService } from '../services/mazo.service';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit  {
 
  @Output() onEnviarJugada = new EventEmitter();
  puntajeJugador: number; 
  
  cartaDorso = new Carta("dorso",0,false)
  mano:Carta[]=[];
  carta:Carta;  
  puntaje:number= 0; //puntos del crupier  
  resultado: number = 0; // 1 - Se paso | 2 - Empate | 3 - Derrota | 4 - Victoria

  constructor(private servicioMazo:MazoService, private router: Router){
    
  }
  plantarse(puntajeJugador: number){
    this.puntajeJugador = puntajeJugador;
    this.mano.splice(1,1);
    let puedeJugar: boolean = true;
    while(puedeJugar){
      this.calcularPuntaje();
      if(this.puntaje <16){
        this.pedirCarta();        
      } 
      else{
        puedeJugar = false;
      }
    }   
    this.calcularVictoria();
    
  }  

  calcularVictoria(){
    if(this.puntajeJugador == 21 && this.puntaje!=21){
      this.resultado = 5;
      console.log(this.puntaje);
      return;
    }
    if(this.puntajeJugador > 21){
      this.resultado = 1;
      return;      
    }
    if(this.puntajeJugador == this.puntaje){
      this.resultado = 2;
      return;
    }
    if(this.puntajeJugador < this.puntaje && this.puntaje<=21){
      this.resultado = 3;
      return;
    }        
    else{
      this.resultado = 4;            
    }
  }  

  pedirCarta(){
    this.carta=this.servicioMazo.sacarCarta()
    this.mano.push(this.carta);
    this.calcularPuntaje();
  }

  reiniciarJuego(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  calcularPuntaje(){
    this.puntaje = 0;
    let tieneAs = false;

    for( let i =0 ; i < this.mano.length ; i++ ){
      if(this.mano[i].valor>10){
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
    
  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(){
    this.servicioMazo.crearMazo();
    this.pedirCarta();
    this.mano.push(this.cartaDorso);
  }
  

}
