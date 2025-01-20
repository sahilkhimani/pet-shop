import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  sliderImgs : string[] = [
    'assets/images/slider-1.jpg',
    'assets/images/slider-3.jpg',
    'assets/images/slider-2.jpg',
  ]
}
