import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component'



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ShopComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
