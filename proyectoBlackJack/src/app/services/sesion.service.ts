import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteGlobal } from '../models/reporte-global';
import { ReporteUsuario } from '../models/reporte-usuario';
import { Sesion } from '../models/sesion';
import { Usuario21 } from '../models/usuario21';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  urlBaseApi: string = environment.urlBaseApi;

  constructor(private http: HttpClient) {

  }

  CrearSesion(idUsuario: number): Observable<any> {
    const comando = {
      "idUsuario": idUsuario
    };
    const url = this.urlBaseApi + "/api/Sesion/VerificarSesion?idUsuario=" + idUsuario;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);


    return this.http.post(url, body, { 'headers': headers })

  }

  getSesion(idSesion: number): Observable<Sesion> {
    const url = this.urlBaseApi + "/api/Sesion/Sesion?idSesion=" + idSesion;
    return this.http.get<Sesion>(url);
  }

  juegoNuevo(sesion: Sesion): Observable<Sesion> {
    const comando = {
      "idsesion": sesion.idsesion,
      "idusuario": sesion.idusuario,
      "enjuego": sesion.enjuego
    };
    const url = this.urlBaseApi + "/api/Sesion/IniciarJuegoNuevo";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    //pone enJuego en 1
    return this.http.put<Sesion>(url, body, { 'headers': headers })
  }

  ReiniciarJuego(sesion: Sesion): Observable<Sesion> {
    const comando = {
      "idsesion": sesion.idsesion,
      "idusuario": sesion.idusuario,
      "enjuego": sesion.enjuego
    };
    const url = this.urlBaseApi + "/api/Sesion/ReiniciarJuego";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    //pone enJuego en 0
    return this.http.put<Sesion>(url, body, { 'headers': headers })
  }

  ActualizarStats(sesion: Sesion): Observable<Sesion> {
    const comando = {
      "idsesion": sesion.idsesion,
      "idusuario": sesion.idusuario,
      "enjuego": sesion.enjuego,
      "victoriasJugador": sesion.victoriasJugador,      
      "blackjackJugador": sesion.blackjackJugador,      
      "blackjackCrupier": sesion.blackjackCrupier,
      "totalDePartidas": sesion.totalDePartidas,
      "sePasoDe21": sesion.sePasoDe21
    }
    const url = this.urlBaseApi + "/api/Sesion/ActualizarEstadisticas";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);
    return this.http.put<Sesion>(url, body, { 'headers': headers })
  }

  ObtenerStatsGlobales(): Observable<ReporteGlobal> {
    const url = this.urlBaseApi + "/api/Sesion/EstadisticasGlobales"
    return this.http.get<ReporteGlobal>(url);
  }

  ObtenerStatsUsuario(usuario: number): Observable<ReporteUsuario> {
    const url = this.urlBaseApi + "/api/Sesion/EstadisticasJugador?Usuario=" + usuario;
    return this.http.get<ReporteUsuario>(url);
  }

  ObtenerUsuariosMas21(): Observable<Usuario21[]>{
    const url = this.urlBaseApi + "/api/Sesion/MasSePasaron";
    return this.http.get<Usuario21[]>(url);
  }

}
