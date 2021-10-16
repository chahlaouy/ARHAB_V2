import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {

  title: string = "تقيماتي";
  subTitle: string = "تقيماتي حسب الرحلة عدد 1234";
  constructor() { }

  ngOnInit() {}

}
