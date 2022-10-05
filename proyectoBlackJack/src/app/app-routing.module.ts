import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ReglaComponent } from './regla/regla/regla.component';

const routes: Routes = [
  {path: 'menu',component:MenuComponent},
  {path: '', redirectTo: 'menu', pathMatch: 'full'},
  {path:'regla',component:ReglaComponent},
  {path: 'juego',component:JuegoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
