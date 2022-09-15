import { Injectable } from '@angular/core';
import { IApiListBuy } from '@data/interfaces/api/iapi-list-buy.metadata';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  private _compras:IApiListBuy[] =[]

  constructor() { }

  get historial(){
    return[...this._compras];
  }

  ListaCompras(query: IApiListBuy){

    if(!this._compras.includes(query)){

      this._compras.unshift(query);
      this._compras = this._compras.splice(0, 50)

      localStorage.setItem('historial', JSON.stringify(this._compras));



    }

}
}

