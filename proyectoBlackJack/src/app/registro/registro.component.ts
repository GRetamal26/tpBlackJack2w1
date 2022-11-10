import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioRegistro } from '../models/usuario-registro';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  error:boolean = false;
  logeado:boolean = false;
  usuario:UsuarioRegistro = {} as UsuarioRegistro;
  form = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
    re_contrasenia: new FormControl('', Validators.required)
  })

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){  
    if(this.form.valid && this.comparar()){
      
      this.usuario.nomUsuario = this.form.get('usuario')!.value!;   
      this.usuario.contrasenia = this.form.get('contrasenia')!.value!;
      console.log(this.usuario);
      this.usuarioService.Register(this.usuario).subscribe({
        next: (response: UsuarioRegistro) => {
          alert("Usuario registrado correctamente");          
          this.router.navigate(['login']); 
        },
        error: (error) => this.error = true         
      })
    }
    else{
      
      this.error = true;
    }
  }

  comparar():boolean {
    let concuerda = false;
    if(this.form.controls['contrasenia'].value == this.form.controls['re_contrasenia'].value){
      concuerda = true;
    }
    return concuerda;
  }

}
