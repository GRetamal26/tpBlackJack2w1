import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { UsuarioRegistro } from '../models/usuario-registro';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  urlBaseApi: string = environment.urlBaseApi;

  constructor(private http: HttpClient) {

   }

  Login(usuario: Usuario):Observable<any>{    
    const comando = {
        "nomUsuario": usuario.nom_usuario,
        "contrasenia": usuario.contrasenia
    };
  
    const url = this.urlBaseApi + "/api/usuario/login";
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(comando);
    console.log(body);
    
    return this.http.post(url,body, {'headers' : headers})
  
  }

  Register(usuario: UsuarioRegistro):Observable<any>{    
    const comando = {
        "nomUsuario": usuario.nomUsuario,
        "contrasenia": usuario.contrasenia
    };
  
    const url = this.urlBaseApi + "/api/usuario/nuevoUsuario";
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(comando);
    console.log(body);
    
    return this.http.post(url,body, {'headers' : headers})
  
  }
}
