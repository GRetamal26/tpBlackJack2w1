import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  sesion = {} as Sesion;
  /* enjuego = false; */
  private subscription = new Subscription();
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService) {
    //[ngClass]="sesion.enjuego == 1 ? 'btn btn-warning btn-lg ' : 'btn btn-warning btn-lg disabled' "
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarSesion();
    /* this.enjuego=true; */
  }
  IrAReportes(){
    this.router.navigate(["reportes",this.sesion.idsesion])
  }

  IrAJuegoNuevo(){
    this.sesionService.ReiniciarJuego(this.sesion).subscribe({
      next :(response:Sesion) => {
        this.sesion = response;
        console.log(this.sesion);
        this.router.navigate(["juego",this.sesion.idsesion])
      }
    });

    
  }

  IrAJuego(){
    this.router.navigate(["juego",this.sesion.idsesion])
  }
  
  private cargarSesion(){
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.sesion.idsesion = params["idSesion"];
          this.sesionService.getSesion(this.sesion.idsesion).subscribe({
            next: (respuesta: Sesion) => {
              this.sesion = respuesta;
              /* console.log(this.sesion);
              if(this.sesion.enjuego == 0){
                this.enjuego = true;
              } */
            },
            error: () => {
              alert("Error al instaurar sesion")
            }
          })
          //Carga de sesion

        }
      })
    )
  }


  
}
