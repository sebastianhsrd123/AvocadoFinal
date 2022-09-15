import { Component, OnInit, Input } from '@angular/core';
import { ISliderItem } from './islider-item.metadata';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() height = 600; // Altura por defecto
  @Input() isFullScreen = false; //En caso de desear pantalla completa
  @Input() items: ISliderItem[] = []; // Importar interface Creada
  
  // Propiedades Finales
    public finalHeigth: string | number = 0; // Tamaño final puede ser string o numero
    public currentPosition = 0; // Posicion Actual
    constructor() {
    /*
      Si la pantalla esta al maximo, se visualizar en FullScreen
      Sino el tamaño depende de la variable HEIGHT
    */
    this.finalHeigth = this.isFullScreen ? '100vh' : `${this.height}px`;
   }
  

   ngOnInit(): void {
    this.items.map(( i, index)=>{
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position:number){
    this.currentPosition = position;
    this.items.find((i) => i.id === 0)!.marginLeft = -100 * position;
    
  } 

  setNext(){
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if(nextPosition<= this.items.length - 1){
      finalPercentage = -100 * nextPosition;

    }else{
      nextPosition = 0;
    }
    this.items.find(i => i.id)!.marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack(){
    
    let finalPercentage = 0;
    let backPosition = this.currentPosition -1;
    if (backPosition >= 0){
      finalPercentage = -100 * backPosition;
    }
    this.items.find(i => i.id)!.marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }

}


