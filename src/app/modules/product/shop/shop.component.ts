import { Component, OnInit } from '@angular/core';
import { IApiUserAuthenticated } from '@data/interfaces';
import { IFacturaVenta } from '@data/interfaces/api/ifactura-venta.metadata';
import { AuthService } from '@data/services/api/auth.service';
import { IFactura } from '@shared/components/card/card-product/ifactura.metadata';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public compra: IFactura[]=[];
  public User: IApiUserAuthenticated= {} as IApiUserAuthenticated;
  public total: number = 0;
  public metodo:string = "No hay pago"
  public factura_venta: IFacturaVenta = {} as IFacturaVenta;

  constructor(private authservice: AuthService) {
    if( localStorage.getItem('historial')){
      this.compra = JSON.parse(localStorage.getItem('historial')!);
      this.User = JSON.parse(localStorage.getItem('UserOfAvocado')!);
      this.valor_total();
    }
   }


   valor_total(){
    for(let compras of this.compra){
      this.total = this.total + compras.Valor_total;
    }
   }

   get pago_credito(){
    this.metodo = "Credito";

    return this.metodo;
   }
   get pago_debito(){
    this.metodo = "Debito";

    return this.metodo;
   }
   get pago_efectivo(){
    this.metodo = "Efectivo";

    return this.metodo;
   }
   get pago_transferencia(){
    this.metodo = "Transferencia";

    return this.metodo;
   }

  ngOnInit(): void {
  }


  Registered(){
    this.factura_venta = {
    user: this.User.name,
    dir: this.User.direction,
    email: this.User.email,
    Total: this.total,
    Pago: this.metodo
    }
    this.authservice.RegisterSold(this.factura_venta).subscribe(user => {
      console.log(user);
    })
}

}
