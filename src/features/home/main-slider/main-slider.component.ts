import { CurrencyPipe } from '@angular/common';
import { Component , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@Component({
  selector: 'app-main-slider',
  imports: [CurrencyPipe],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainSliderComponent {

}
