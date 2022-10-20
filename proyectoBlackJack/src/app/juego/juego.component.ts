import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { Carta } from '../models/carta';
import { cartaInsert } from '../models/cartaInsert';
import { Sesion } from '../models/sesion';
import { JuegoService } from '../services/juego.service';
import { MazoService } from '../services/mazo.service';
import { SesionService } from '../services/sesion.service';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  idSesion: number;
  sesion = {} as Sesion;

  subscription: Subscription = new Subscription();

  cartasJugadas: Carta[] = [];
  cartasRestantes: Carta[] = [];
  manoCrupier: Carta[] = [];
  manoJugador: Carta[] = [];

  contadorVictorias: number = 0;
  contadorDerrotas: number = 0;


  puntajeJugador: number;
  puntajeCrupier: number;
  cartaDorso = new Carta('0', 0, false);

  resultado: number = 0; // 1 - Se paso | 2 - Empate | 3 - Derrota | 4 - Victoria   
  habilitarPedido: boolean = true;
  sinAvisar: boolean = true;
  

  constructor
    (
      private servicioSesion: SesionService,
      private servicioMazo: MazoService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private servicioJuego: JuegoService
    ) { }

  ngOnInit(): void {
    this.cargarIdSesion();
  }


  //-----------------------------------------------LOGICA DEL JUEGO--------------------------

  //ESTO ME CARGA LA SESION DEL JUGADOR
  cargarIdSesion() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.idSesion = params['idSesion'];
          this.cargarSesion();
        }
      })
    )
  }

  cargarSesion() {
    this.servicioJuego.getSesion(this.idSesion).subscribe({
      next: (response: Sesion) => {
        this.sesion = response;
        this.cargarPartida();
      }
    });
  }

  //Carga el mazo e inicia el juego

  cargarPartida() {
    if (this.sesion.enjuego == 0) {
      this.servicioMazo.getMazo().subscribe({
        next: (data) => {
          this.cartasRestantes = data;          
          this.iniciarJuego();
          this.servicioSesion.juegoNuevo(this.sesion).subscribe(x => console.log(x));
        }
      })
    } else {
      this.obtenerJuego();      
    }
  }

  obtenerJuego() {    
    this.obtenerManoJugador();
    this.obtenerManoCrupier();  
    this.obtenerCartasJugadas();
    this.obtenerCartasCartasRestantes();    
  }

  iniciarJuego() {
    //mano inicial Crupier
    this.pedirCarta(this.manoCrupier, false);
    this.manoCrupier.push(this.cartaDorso);

    //mano inicial Jugador
    this.pedirCarta(this.manoJugador, true);
    this.pedirCarta(this.manoJugador, true);

  }



  //sacar ccartas aleatorias del mazo
  sacarCarta() {
    //step 1, extract a random card from the remaining ones in the pack
    let indiceRandom = Math.floor(Math.random() * (this.cartasRestantes.length + 1)) + 0;
    let carta = this.cartasRestantes[indiceRandom];
    if (carta === undefined) {
      carta = this.sacarCarta();
    }
    this.cartasRestantes.splice(indiceRandom, 1);
    this.cartasJugadas.push(carta);
    return carta;
  }

  pedirCarta(mano: Carta[], jugador: boolean) {

    let carta = this.sacarCarta();
    mano.push(carta);
    let puntaje = this.calcularPuntaje(mano);
    if (jugador) {
      this.puntajeJugador = puntaje;
      if (this.puntajeJugador >= 21) { //revisa el puntaje del jugador para terminar la jugada
        this.habilitarPedido = false;
        this.plantarJugada();
      }
    }
    else {
      this.puntajeCrupier = puntaje;
    }
    //this.calcularCartasRestantes();
    //this.actualizarJuego();
  }

  //calculo de puntajes, victoria o no, etc
  plantarJugada() {
    this.puntajeJugador = this.calcularPuntaje(this.manoJugador);
    this.habilitarPedido = false;

    this.manoCrupier.splice(1, 1); //quita el dorso
    let puedeJugar: boolean = true;
    while (puedeJugar) {
      this.puntajeCrupier = this.calcularPuntaje(this.manoCrupier);
      if (this.puntajeCrupier < 16) {
        this.pedirCarta(this.manoCrupier, false);
      }
      else {
        puedeJugar = false;
      }
    }
    this.calcularVictoria();

  }

  volverAPlantar(){
    this.puntajeJugador = this.calcularPuntaje(this.manoJugador);
    this.habilitarPedido = false; 
    this.puntajeCrupier = this.calcularPuntaje(this.manoCrupier);
    this.calcularVictoria();
  }

  calcularPuntaje(mano: Carta[]): number {
    let puntaje = 0;
    let tieneAs = false;

    for (let i = 0; i < mano.length; i++) {
      if (mano[i].valor > 10) { // para J, Q y K
        puntaje += 10;
      } else {
        puntaje += mano[i].valor;
      }
      if (mano[i].esAs) {
        tieneAs = true
      }
    }
    if (tieneAs && puntaje + 10 <= 21) {
      puntaje += 10;
    }
    return puntaje;
  }

  calcularVictoria() {
    // 1 - Se paso | 2 - Empate | 3 - Derrota | 4 - Victoria
    if (this.puntajeJugador == 21 && this.puntajeCrupier != 21) {
      this.resultado = 5;
      this.contadorVictorias++;
      return;
    }
    if (this.puntajeJugador > 21) {
      this.resultado = 1;
      this.contadorDerrotas++;
      return;
    }
    if (this.puntajeJugador == this.puntajeCrupier) {
      this.resultado = 2;
      return;
    }
    if (this.puntajeJugador < this.puntajeCrupier && this.puntajeCrupier <= 21) {
      this.resultado = 3;
      this.contadorDerrotas++;
      return;
    }
    else {
      this.resultado = 4;
      this.contadorVictorias++;
    }
  }

  reiniciarJuego() {
    this.manoCrupier = [];
    this.manoJugador = [];
    this.servicioMazo.getMazo().subscribe({
      next: (data) => {
        this.cartasRestantes = data;
        /* this.cartaDorso = this.cartasRestantes[0];
        this.cartasRestantes.splice(0, 1); */
        this.iniciarJuego();
        this.resultado = 0;
        this.habilitarPedido = true;
      }
    });
    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([currentUrl]);
    // });
  }

  siguienteRonda() {
    this.habilitarPedido = true;
    this.resultado = 0;
    this.manoJugador = [];
    this.manoCrupier = [];
    this.pedirCarta(this.manoCrupier, false);
    this.manoCrupier.push(this.cartaDorso);

    //mano inicial Jugador
    this.pedirCarta(this.manoJugador, true);
    this.pedirCarta(this.manoJugador, true);
  }

  calcularCartasRestantes() {
    if (this.cartasRestantes.length <= 50 && this.cartasRestantes.length>40 && this.sinAvisar) {
      alert('El juego se reiniciara automaticamente cuando el mazo tenga 40 cartas o menos')
      this.sinAvisar = false;
    } else if (this.cartasRestantes.length <= 40) {
      this.plantarJugada();
      this.reiniciarJuego();
      this.sinAvisar = true;
    }
  }

  //---------------------------------------PARAMETROS Y MANEJO DE SESION
  actualizarJuego() {
    this.borrarCartas(this.sesion.idsesion);
    this.insertarManoJugador(this.manoJugador);
    this.insertarManoCrupier(this.manoCrupier);
    this.insertarCartasRestantes(this.cartasRestantes);
    this.insertarCartasJugadas(this.cartasJugadas);
  }

  

  obtenerManoJugador() {
    this.servicioJuego.getManoJugador(this.sesion.idsesion).subscribe({
      next: (response: Carta[]) => {
        this.manoJugador = response;
        this.puntajeJugador = this.calcularPuntaje(this.manoJugador);
      }
    });

  }

  obtenerManoCrupier() {
    this.servicioJuego.getManoCrupier(this.sesion.idsesion).subscribe({
      next: (response: Carta[]) => {
        this.manoCrupier = response;
        this.puntajeCrupier = this.calcularPuntaje(this.manoCrupier);
        for(let x of this.manoCrupier){
          if(x.valor == 0){  
                    
            this.habilitarPedido = true;
            this.resultado = 0;            
            //volver a poner el dorso al final
            this.manoCrupier.splice(this.manoCrupier.findIndex(carta => carta.valor == x.valor));
            this.manoCrupier.push(x);                      
          }
          else{
            this.volverAPlantar();
          }
        }
      }
    });
  }

  obtenerCartasJugadas() {
    this.servicioJuego.getCartasJugadas(this.sesion.idsesion).subscribe({
      next: (response: Carta[]) => {
        this.cartasJugadas = response;
      }
    });
  }

  obtenerCartasCartasRestantes() {
    this.servicioJuego.getCartasRestantes(this.sesion.idsesion).subscribe({
      next: (response: Carta[]) => {
        this.cartasRestantes = response;
      }
    });
  }

  insertarManoJugador(cartas: Carta[]) {
    for (let i = 0; i < cartas.length; i++) {
      let carta = {} as cartaInsert;
      carta.idsesion = this.sesion.idsesion;
      carta.palo = cartas[i].palo
      carta.valor = cartas[i].valor
      if (cartas[i].esAs == true) {
        carta.esAs = 1;
      } else {
        carta.esAs = 0;
      }
      this.servicioJuego.postManoJugador(carta).subscribe();
    }
  }

  insertarManoCrupier(cartas: Carta[]) {
    for (let i = 0; i < cartas.length; i++) {
      let carta = {} as cartaInsert;
      carta.idsesion = this.sesion.idsesion;
      carta.palo = cartas[i].palo
      carta.valor = cartas[i].valor
      if (cartas[i].esAs == true) {
        carta.esAs = 1;
      } else {
        carta.esAs = 0;
      }
      this.servicioJuego.postManoCrupier(carta).subscribe();
    }
  }

  insertarCartasRestantes(cartas: Carta[]) {
    for (let i = 0; i < cartas.length; i++) {
      let carta = {} as cartaInsert;
      carta.idsesion = this.idSesion;
      carta.palo = cartas[i].palo
      carta.valor = cartas[i].valor
      if (cartas[i].esAs == true) {
        carta.esAs = 1;
      } else {
        carta.esAs = 0;
      }
      this.servicioJuego.postCartasRestantes(carta).subscribe();
    }
  }

  insertarCartasJugadas(cartas: Carta[]) {
    for (let i = 0; i < cartas.length; i++) {
      let carta = {} as cartaInsert;
      carta.idsesion = this.idSesion;
      carta.palo = cartas[i].palo
      carta.valor = cartas[i].valor
      if (cartas[i].esAs == true) {
        carta.esAs = 1;
      } else {
        carta.esAs = 0;
      }
      this.servicioJuego.postCartasJugadas(carta).subscribe();
    }
  }
  borrarCartas(id: number) {
    this.servicioJuego.deleteCartasJugadas(id).subscribe();
    this.servicioJuego.deleteCartasRestantes(id).subscribe();
    this.servicioJuego.deleteManoJugador(id).subscribe();
    this.servicioJuego.deleteManoCrupier(id).subscribe();
  }



  //-------------------otros

  volverAlMenu() {
    this.actualizarJuego();
    
    this.router.navigate(['menu', this.idSesion]);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.actualizarJuego();
    console.log('actualizo')
  }


}
