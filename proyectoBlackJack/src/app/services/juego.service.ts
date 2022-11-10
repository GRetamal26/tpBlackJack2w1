import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartaComponent } from '../carta/carta.component';
import { Carta } from '../models/carta';
import { cartaInsert } from '../models/cartaInsert';
import { Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  urlBaseApi: string = environment.urlBaseApi; 
  

  constructor(private http: HttpClient) { 

  }

  //METODOS GET

  getSesion(idSesion:number):Observable<Sesion>{
    const url = this.urlBaseApi + "/api/Sesion/Sesion?idSesion=" + idSesion;
    return this.http.get<Sesion>(url);
  }

  getCartasRestantes(idsesion: number): Observable<Carta[]>{    
    const url = this.urlBaseApi + "/api/CartasRestantes/CartasRestantes?idSesion=" + idsesion;
    return this.http.get<Carta[]>(url);
  }

  getCartasJugadas(idsesion: number): Observable<Carta[]>{
    const url = this.urlBaseApi + "/api/CartasJugadas/CartasJugadas?idSesion=" + idsesion;
    return this.http.get<Carta[]>(url);
  }
  
  getManoJugador(idsesion: number): Observable<Carta[]>{
    const url = this.urlBaseApi + "/api/ManoJugador/ManoJugador?idSesion=" + idsesion;
    return this.http.get<Carta[]>(url);
  }
  
  getManoCrupier(idsesion: number): Observable<Carta[]>{
    const url = this.urlBaseApi + "/api/ManoCrupier/ManoCrupier?idSesion=" + idsesion;
    return this.http.get<Carta[]>(url);
  }

  //METODOS POST
    postCartasJugadas(carta: cartaInsert):Observable<any>{ 

      const comando = {
        "idsesion": carta.idsesion,
        "palo": carta.palo,
        "valor": carta.valor,
        "esAs": carta.esAs
      }    
      const body = JSON.stringify(comando);  
      const url = this.urlBaseApi + "/api/CartasJugadas/InsertCartasJugadas";
      const headers = {'content-type':'application/json'};
      return this.http.post(url,body, {'headers' : headers});
    }

    postCartasRestantes(carta: cartaInsert):Observable<any>{ 

      const comando = {
        "idsesion": carta.idsesion,
        "palo": carta.palo,
        "valor": carta.valor,
        "esAs": carta.esAs
      }    
      const body = JSON.stringify(comando);  
      const url = this.urlBaseApi + "/api/CartasRestantes/InsertCartasRestantes";
      const headers = {'content-type':'application/json'};
      return this.http.post(url,body, {'headers' : headers});
    }

    postManoJugador(carta: cartaInsert):Observable<any>{ 

      const comando = {
        "idsesion": carta.idsesion,
        "palo": carta.palo,
        "valor": carta.valor,
        "esAs": carta.esAs
      }    
      const body = JSON.stringify(comando);  
      const url = this.urlBaseApi + "/api/ManoJugador/InsertManoJugador";
      const headers = {'content-type':'application/json'};
      return this.http.post(url,body, {'headers' : headers});
    }

    postManoCrupier(carta: cartaInsert):Observable<any>{ 

      const comando = {
        "idsesion": carta.idsesion,
        "palo": carta.palo,
        "valor": carta.valor,
        "esAs": carta.esAs
      }    
      const body = JSON.stringify(comando);  
      const url = this.urlBaseApi + "/api/ManoCrupier/InsertManoCrupier";
      const headers = {'content-type':'application/json'};
      return this.http.post(url,body, {'headers' : headers});
    }

  //METODOS DELETE
 
  deleteCartasJugadas(idsesion: number): Observable<any> {
    const url = this.urlBaseApi + "/api/CartasJugadas/DeleteCartasJugadas?idSesion=" + idsesion;
    return this.http.delete(url);    
  }

  deleteCartasRestantes(idsesion: number): Observable<any> {
    const url = this.urlBaseApi + "/api/CartasRestantes/DeleteCartasRestantes?idSesion=" + idsesion;
    return this.http.delete(url);    
  }

  deleteManoJugador(idsesion: number): Observable<any> {
    const url = this.urlBaseApi + "/api/ManoJugador/DeleteManoJugador?idSesion=" + idsesion;
    return this.http.delete(url);    
  }

  deleteManoCrupier(idsesion: number): Observable<any> {
    const url = this.urlBaseApi + "/api/ManoCrupier/DeleteManoCrupier?idSesion=" + idsesion;
    return this.http.delete(url);    
  }



}