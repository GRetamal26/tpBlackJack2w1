import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  urlBaseApi: string = environment.urlBaseApi; 

  constructor(private http: HttpClient) {

  }

  CrearSesion(idUsuario: number):Observable<any>{    
    const comando = {   
      "idUsuario": idUsuario      
    };  
    const url = this.urlBaseApi + "/api/Sesion/VerificarSesion?idUsuario=" + idUsuario;
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(comando);
    
    
    return this.http.post(url,body, {'headers' : headers})
  
  }

  getSesion(idSesion:number):Observable<Sesion>{
    const url = this.urlBaseApi + "/api/Sesion/Sesion?idSesion=" + idSesion;
    return this.http.get<Sesion>(url);
  }

  juegoNuevo(sesion:Sesion):Observable<Sesion>{
    const comando = {   
      "idsesion": sesion.idsesion,
      "idusuario": sesion.idusuario,
      "enjuego": sesion.enjuego     
    };  
    const url = this.urlBaseApi + "/api/Sesion/IniciarJuegoNuevo";
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(comando);
    
    //pone enJuego en 1
    return this.http.put<Sesion>(url,body, {'headers' : headers})
  }

  ReiniciarJuego(sesion:Sesion):Observable<Sesion>{
    const comando = {   
      "idsesion": sesion.idsesion,
      "idusuario": sesion.idusuario,
      "enjuego": sesion.enjuego      
    };  
    const url = this.urlBaseApi + "/api/Sesion/ReiniciarJuego";
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(comando);
    
    //pone enJuego en 0
    return this.http.put<Sesion>(url,body, {'headers' : headers})
  }

}
