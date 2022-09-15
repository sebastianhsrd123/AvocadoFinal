import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApiListBuy } from '@data/interfaces/api/iapi-list-buy.metadata';
import { ListServiceService } from '@data/services/api/list-service.service';
import { ProductService } from '@data/services/api/product.service';
import { ICardProduct } from '@shared/components/card/card-product/icard-product.metadata';
import { IFactura} from '@shared/components/card/card-product/ifactura.metadata';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges, DoCheck {
  @Input() products: ICardProduct[]=[];

  public id:string | null;
  public Id:number;
  public Product: ICardProduct[]=[];
  public unidad: number;
  public tipo: number;
  public w="Lb";
  public sesion:boolean = false;



  constructor(
    private route: ActivatedRoute,
    private productservice: ProductService,
    private listservice:ListServiceService
    )
    {

      this.productservice.getAllProducts().subscribe( r => {
        console.log("No se", r.data);
        if(!r.error){
          this.products = r.data;
        }

      });


      this.unidad=0;
      this.tipo=0;
      this.id = this.route.snapshot.paramMap.get("id");
      this.Id = 0;
      if(this.id == null){
        this.id = "error"
      }else{
        this.Id=parseInt(this.id);
        this.productservice.getProductsbyId(this.Id).subscribe(r => {
          if(!r.error){
          this.Product = r.data;
          this.tipo = parseInt(this.Product[0].Price)


          }
        });

    }
    this.obtener_usuario();
  }

  obtener_usuario(){
    if(localStorage.getItem("UserOfAvocado")){
      this.sesion = true;
    }
    else {
      this.sesion = false;
      }





  }

  refresh(): void{
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id != null){
    this.Id=parseInt(this.id);
    }
    if(this.Id != this.Product[0].id){
        this.productservice.getProductsbyId(this.Id).subscribe(r => {
        if(!r.error){
        this.Product = r.data;
        this.tipo = parseInt(this.Product[0].Price)
        }
        });
    }

  }
  ngOnInit(): void {
   // this.getproduct();


    }

  ngDoCheck() {}
  ngOnChanges() {}

  //getproduct(): void {


  callkg():string{
    this.tipo = parseInt(this.Product[0].Price) * 2;
    return this.w="Kg";
  }

  callB():string{
    this.tipo = parseInt(this.Product[0].Price) * 50;
    return this.w="B";
  }

  calllB():string{
    this.tipo = parseInt(this.Product[0].Price);
    return this.w="Lb";
  }

  Upud(){
    this.unidad +=1;
    if (this.unidad>99) {
      this.unidad =0;
    }

  }

  Downud(){
    this.unidad -=1;
    if (this.unidad<1) {
      this.unidad =0;
    }

  }

  factura():IFactura{
    return {
      Prod: this.Product[0].Name,
      unidad:this.unidad,
      Peso:this.w,
      Valor_cu:this.tipo,
      Valor_total:this.tipo * this.unidad
    };

  }

  carrito(){
    if(this.sesion){
      this.listservice.ListaCompras(this.factura());
      }
    console.log(this.listservice.historial);
  }

  get showfactura(){
    return this.listservice.historial;
  }

}
