import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {

  title: string = "الرحلة عدد 1234";
  subTitle: string = "قائمة الحجوزات الرحلة عدد 1234";

  constructor() { }

  ngOnInit() {}

}
