import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';



const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },

  {
    path: 'add/:id',
    component: ProductDetailComponent
  },

  {
    path: 'finish/bought',
    component: ShopComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
