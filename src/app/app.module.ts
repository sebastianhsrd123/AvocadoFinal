import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';//Modulo de tokens
import { DataModule } from './data/data.module';//Modulo de datos
import { SharedModule } from './shared/shared.module';//Modulo de archivos a mostrar
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';// elimina el signo # o signo de gato a las rutas
import { ProductModule } from '@modules/product/product.module';


@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Importar los modulos de datos
    CoreModule,
    DataModule,
    SharedModule,
    ProductModule

  ],
  providers: [
    Location,{
    provide:LocationStrategy,
    useClass:PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
