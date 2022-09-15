import { Injectable } from '@angular/core';
import { ICardProduct } from '@shared/components/card/card-product/icard-product.metadata';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from "rxjs";
import { environment } from 'environments/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ProductService{

  public url = environment.uri;
  public isProduction = environment.production;



  constructor(private http:HttpClient){}

  error(error: HttpErrorResponse){
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    }else{
      errorMsg = `Error Code ${error.status}\nMessage:_${error.message}`;
    }
    //return of({error:true, msg:errorMsg, data: null })
    console.log(errorMsg)
    return of({error:true, msg:errorMsg, data: null })

  }
  getAllProducts(): Observable<{error:boolean, msg:string, data:ICardProduct[]}>{
    const response = {error: false, msg: '', data: [] as ICardProduct[]}
    return this.http.get<ICardProduct[]>('http://apiav.test/api/producto')
    .pipe(
      map(
        r => {
          response.data = r;
          return response;
        }
      ),
      catchError(() => of(response))
    );
  }

  getProductsbyId(id:number): Observable<{error:boolean, msg:string, data:ICardProduct[]}>{
    const response = {error: false, msg: '', data:[]  as ICardProduct[]};
    return this.http.get<ICardProduct[]>('http://apiav.test/api/producto/' + id)
    .pipe(
      map(
        r => {

          response.data = r;
          return response;
        }
      ),
      catchError(() => of(response))
    );
  }


}

