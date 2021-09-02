import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss'],
})
export class RidesComponent implements OnInit {

  title: string = "قائمة الحجوزات";
  subTitle: string = "قائمة الحجوزات حسب الرحلات";
  constructor() { }

  ngOnInit() {}

}
