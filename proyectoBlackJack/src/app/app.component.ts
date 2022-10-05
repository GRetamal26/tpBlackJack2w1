import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoBlackJack';
  constructor(private route:Router){    

  }
    regla():boolean{
      this.route.navigate(['regla'])
      return false
    }
}

