import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu/menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegistroComponent } from './registro/registro.component';
import { ReglaComponent } from './regla/regla/regla.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {path: 'menu/:idSesion',component:MenuComponent},
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'principal', component:PrincipalComponent},
  {path: 'registro', component:RegistroComponent},
  //{path:'regla',component:ReglaComponent},
  {path: 'juego/:idSesion',component:JuegoComponent},
  {path: 'login',component:LoginComponent},
  {path: 'reportes/:idSesion', component:ReporteComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
