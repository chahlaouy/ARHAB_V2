import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {

sliderImages = [
  '../../../../assets/default-car-1.png',
  '../../../../assets/default-car-2.png',
  '../../../../assets/default-car-3.png',
]

sliderOptions = {
    autoplay: {
        delay: 2000
    },
    loop: true
}
title: string = "سيارتي";

  constructor() { }

  
ngOnInit() {}
  
  
}
