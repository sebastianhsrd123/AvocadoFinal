import { Component, Input, OnInit } from '@angular/core';
import { ICardProduct } from './icard-product.metadata';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  @Input() data?: ICardProduct;
  constructor() { }

  ngOnInit(): void {

    console.log("Avatar",this.data?.id);
  }


}
