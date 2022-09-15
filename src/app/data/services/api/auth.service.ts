import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAuthenticated } from '@data/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserActivated: BehaviorSubject<IApiUserAuthenticated>;
  public nameUser: string;

  constructor(private http: HttpClient, private router:Router) {

    this.nameUser = 'UserOfAvocado';
    this.UserActivated = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUser)!)
      );
  }

  get getUser(): IApiUserAuthenticated {
    return this.UserActivated.value;
  }

  login(
    data: {
      email: string;
      password: string;
    }
  ):Observable <{error:boolean; msg: string; data:any}>{
    const response = {
      error:true,
      msg: "Usuario incorrecto",
      data:null
    };
    return this.http.post<{error:boolean, msg: string, data:any}>(
      API_ROUTES.AUTH.LOGIN, data)
      .pipe(
        map( r => {

          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          this.setUserToLocalStorage(r.data);
          this.UserActivated.next(r.data);
          if(!response.error){
            this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER);
            console.log("Rutas internas",  this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER));
          }
          return response

        }),
        catchError(err =>{
          return of(response)
        })
      )

    }


  Register(
    data: {
      name: string;
      email: string;
      password: string;
      direction: string;
    }
  ):Observable<{error:boolean; msg: string}>{
    const response = {
      error:true,
      msg: "Credenciales invalidas",
    };
    return this.http.post<{error:boolean, msg: string}>(
      API_ROUTES.AUTH.REGISTER, data).pipe(
        map( res => {

          response.msg = res.msg;
          response.error = res.error;
          if(!response.error){
            this.router.navigateByUrl(API_ROUTES.AUTH.LOGIN);
          }
          return response
        }),
        catchError(err =>{
          return of(response)
        })
      )

    }


  RegisterSold(
    data: {
      user: string;
      dir: string;
      email: string;
      Total: number;
      Pago: string;
    }
  ):Observable<{error:boolean; msg: string}>{
    const response = {
      error:true,
      msg: "Venta no realizada",
    };
    return this.http.post<{error:boolean, msg: string}>(
      API_ROUTES.AUTH.SOLD, data).pipe(
        map( res => {

          response.msg = res.msg;
          response.error = res.error;
          if(!response.error){
            localStorage.removeItem('historial');
            this.router.navigateByUrl(API_ROUTES.AUTH.SOLD);
          }
          return response
        }),
        catchError(err =>{
          return of(response)
        })
      )

    }



  logout(){
    localStorage.removeItem(this.nameUser);
    console.log("Si o no",this.nameUser);
    //this.UserActivated.next(JSON.parse("Nulo"));
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }

  private setUserToLocalStorage(user: IApiUserAuthenticated){
    localStorage.setItem(this.nameUser, JSON.stringify(user));
  }
}
