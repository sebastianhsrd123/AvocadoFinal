import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'app/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=>
    import('@modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'app',
    component: SkeletonComponent,
    children: [
      {
        path:'home',
        loadChildren: ()=>
          import('@modules/product/product.module').then( (m) => m.ProductModule)


      }
    ]
  },
  {
    path: '**',
    redirectTo:'app/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
