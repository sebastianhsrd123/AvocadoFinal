import { Component, Input, OnInit, Output } from '@angular/core';
import { ICardProduct } from '@shared/components/card/card-product/icard-product.metadata';
import { ProductService } from '@data/services/api/product.service';
import { ISliderItem } from '@shared/components/slider/islider-item.metadata';
import { SLIDER_ITEMS } from '@data/constants/slider.const';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public sliderData: ISliderItem[] = SLIDER_ITEMS;
  public products: ICardProduct[] = [
    {
      id:10,
      avatar:"https://dam.cocinafacil.com.mx/wp-content/uploads/2018/07/beneficios-de-la-papa-1.jpg",
      Name: 'Papa',
      Price: "127.20",
      Desc:" papa capira recien sacada de la tierra"
  },
];

  constructor(private productService: ProductService) {

     this.productService.getAllProducts().subscribe( r => {
      console.log("No se", r.data);
      if(!r.error){
        this.products = r.data;
      }

    });
  }

  ngOnInit(): void {
    console.log("Product",this.products);

  }

}
/* = [
    {
    avatar:"https://dam.cocinafacil.com.mx/wp-content/uploads/2018/07/beneficios-de-la-papa-1.jpg",
    Name: 'Papa',
    Price: 127.20,
    Desc:" papa capira recien sacada de la tierra"
  },
  {
    avatar:"https://dam.cocinafacil.com.mx/wp-content/uploads/2018/07/beneficios-de-la-papa-1.jpg",
    Name: 'Papa',
    Price: 127.20,
    Desc:" papa capira recien sacada de la tierra"
  },
  {
    avatar:"https://dam.cocinafacil.com.mx/wp-content/uploads/2018/07/beneficios-de-la-papa-1.jpg",
    Name: 'Papa',
    Price: 127.20,
    Desc:" papa capira recien sacada de la tierra"
  },
  {
    avatar:"https://dam.cocinafacil.com.mx/wp-content/uploads/2018/07/beneficios-de-la-papa-1.jpg",
    Name: 'Papa',
    Price: 127.20,
    Desc:" papa capira recien sacada de la tierra"
  },
  {
    avatar:"https://dam.cocinafacil.com.mx/wp-content/uploads/2018/07/beneficios-de-la-papa-1.jpg",
    Name: 'Papa',
    Price: 127.20,
    Desc:" papa capira recien sacada de la tierra"
  },
  ]
  */
