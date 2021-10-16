import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rides-reviews',
  templateUrl: './rides-reviews.component.html',
  styleUrls: ['./rides-reviews.component.scss'],
})
export class RidesReviewsComponent implements OnInit {

  title: string = "تقيماتي";
  subTitle: string = "تقيماتي حسب الرحلة";
  constructor() { }

  ngOnInit() {}

}
