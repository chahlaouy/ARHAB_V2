import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  title: string = "الرحلة عدد 1234"
  subTitle: string = "تفاصيل الرحلة"
  constructor() { }

  ngOnInit() {}

}
