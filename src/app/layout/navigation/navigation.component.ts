import { Component, OnInit } from '@angular/core';
import { IApiUserLogin } from '@data/interfaces';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public nombre:IApiUserLogin = {} as IApiUserLogin;
  public sesion:boolean = false;

  constructor(private authservice: AuthService) {
    this.obtener_usuario();
  }


  obtener_usuario(){
    if(localStorage.getItem("UserOfAvocado")){
      this.nombre = JSON.parse(localStorage.getItem("UserOfAvocado")!);
      this.sesion = true;
    }
    else {
      this.sesion = false;
      }



  }

  dropSesion(){
    this.authservice.logout();
  }

  ngOnInit(): void {
  }

}
