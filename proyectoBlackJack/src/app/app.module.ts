import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoComponent } from './juego/juego.component';
import { JugadorComponent } from './jugador/jugador.component';
import { CartaComponent } from './carta/carta.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ReglaComponent } from './regla/regla/regla.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    JuegoComponent,
    JugadorComponent,    
    CartaComponent,
    ReglaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
