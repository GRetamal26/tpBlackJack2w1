import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ReporteGlobal } from '../models/reporte-global';
import { ReporteUsuario } from '../models/reporte-usuario';
import { Sesion } from '../models/sesion';
import { Usuario21 } from '../models/usuario21';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit , OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  sesion = {} as Sesion;  
  respuesta:ReporteGlobal;
  partidas: number = 0;
  usuarios: Usuario21[];
  jugador: ReporteUsuario;
  idSesion: number;
  datosGlob1:ChartData<'pie'>;
  datosGlob2:ChartData<'pie'>;
  datosGlob3:ChartData<'bar'>;
  datosUser1:ChartData<'pie'>;
  datosUser2:ChartData<'pie'>;
  labels:string[]=["Victorias","Derrotas"];
  lblusuarios: string[]=[];
  private suscription = new Subscription()
  reporte: number = 1;
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,    
    scales: {
      x: {},
      y: {
        min: 0        
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  
  constructor(private serviceSesion: SesionService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
   this.suscription.unsubscribe();
  }

  cambioReporte(reporte: number){
    this.reporte = reporte
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  volverAlMenu(){
    this.router.navigate(['menu', this.idSesion]);
  }


  ngOnInit(): void {
    this.suscription.add(
      this.serviceSesion.ObtenerStatsGlobales().subscribe(respuesta=>{
          this.respuesta = respuesta;          
          let victorias = this.respuesta.victorias!;
          let derrotas = this.respuesta.partidas! - this.respuesta.victorias!; 
          this.partidas = respuesta.partidas!         
          this.datosGlob1 ={
            labels:this.labels,
            datasets:[
              {
                data:[
                  victorias,
                  derrotas,
                ]                
              }
            ]            
          }          
          this.datosGlob2 ={
            labels: ["Jugador", "Crupier"],
            datasets:[
              {
                data:[
                  this.respuesta.bjugador!,
                  this.respuesta.bcrupier!
                ]
              }
            ]
          }          
        }
    ))
    this.suscription.add(
      this.serviceSesion.ObtenerUsuariosMas21().subscribe({
        next: (lista) => {
          this.usuarios = lista;
          let primero = this.usuarios[0];
          let segundo = this.usuarios[1];
          let tercero = this.usuarios[2];   
          this.lblusuarios =  [primero.usuario, segundo.usuario, tercero.usuario]
          this.datosGlob3 ={
          labels: ["Veces que se paso de 21"],
          datasets:[
            {data:
                  [primero.masDe21],label:primero.usuario },  
                      {data:
                        [segundo.masDe21],label:segundo.usuario},
                        {data:
                          [tercero.masDe21],label:tercero.usuario}
                     
          ]
        }
      }
    })
    )
    this.suscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.idSesion = params['idSesion'];
          this.serviceSesion.ObtenerStatsUsuario(this.idSesion).subscribe({
            next: (user) => {
              this.jugador = user
              this.datosUser1 ={
                labels:this.labels,
                datasets:[
                  {
                    data:[
                      this.jugador.victorias,
                      this.jugador.partidas - this.jugador.victorias, //Los empates se cuentan como derrotas
                    ]                
                  }
                ]            
              }          
              this.datosUser2 ={
                labels: ["Jugador", "Crupier"],
                datasets:[
                  {
                    data:[
                      this.jugador.bjugador!,
                      this.jugador.bcrupier!
                    ]
                  }
                ]
              }

            }
          })
          
        }
      })
    )

  }
    
}

  