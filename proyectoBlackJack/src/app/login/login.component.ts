
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sesion } from '../models/sesion';
import { Usuario } from '../models/usuario';
import { SesionService } from '../services/sesion.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  error:boolean = false;
  logeado:boolean = false;
  usuario = {} as Usuario;
  sesion = {} as Sesion;
  
  login = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  })
 

  constructor
  (private router: Router,
     private usuarioService : UsuarioService,
     private sesionService : SesionService
  ) {}

  ngOnInit(): void {

  }  
    
  ingresar(){
    if(this.login.valid){
      this.usuario.nom_usuario = this.login.get('usuario')?.value;
      this.usuario.contrasenia = this.login.get('contrasenia')?.value;
      console.log(this.usuario);
      this.usuarioService.Login(this.usuario).subscribe({
        next: (response: Usuario) => {
          alert("Usuario logueado correctamente");
          this.sesionService.CrearSesion(response.idUsuario).subscribe({
            next:(sesion:Sesion) => {
              this.router.navigate(['menu',sesion.idsesion ]);
            }
          })           
        },
        error: (error) => this.error = true         
      })
    }
    else{
      
      this.error = true;
    }
  }

}
