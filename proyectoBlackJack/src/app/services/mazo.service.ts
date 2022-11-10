import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carta } from '../models/carta';

@Injectable({
  providedIn: 'root'
})
export class MazoService {

  urlBaseApi: string = environment.urlBaseApi; 

  constructor(private http: HttpClient) { 

  }

  getMazo(): Observable<Carta[]>{
    const url = this.urlBaseApi + "/api/Mazo/MazoNuevo";
    return this.http.get<Carta[]>(url);
  }


}

