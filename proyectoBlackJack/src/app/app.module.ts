import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JuegoComponent } from './juego/juego.component';
import { CartaComponent } from './carta/carta.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ReglaComponent } from './regla/regla/regla.component';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './services/usuario.service';
import { PrincipalComponent } from './principal/principal.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    JuegoComponent,      
    CartaComponent,
    ReglaComponent,
    LoginComponent,
    PrincipalComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
