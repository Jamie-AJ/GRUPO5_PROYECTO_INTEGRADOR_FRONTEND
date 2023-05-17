import { Component, Input, OnInit } from '@angular/core';
import { ImageSlider } from '../../../interface/image.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() sliders: ImageSlider[] = [];
  @Input() indicadores = true;
  @Input() text = true;
  @Input() autoPlay = false;
  @Input() slideInterval = 3000;// 3 segundos

  currentSlide = 0;

  ngOnInit() {
    if(this.autoPlay){
      this.autoSlideImage();
    }
  }

  autoSlideImage():void{
    setInterval(() =>{
      this.nextClick();
    },this.slideInterval)
  }
  
  nextClick():void{
    if(this.currentSlide === this.sliders.length - 1){
      this.currentSlide = 0;
    }else{
      this.currentSlide++;
    }
  }
  selectImage(index:number):void{
    this.currentSlide = index;
  }
}
