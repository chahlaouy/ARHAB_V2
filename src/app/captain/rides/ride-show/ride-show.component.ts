import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride-show',
  templateUrl: './ride-show.component.html',
  styleUrls: ['./ride-show.component.scss'],
})
export class RideShowComponent implements OnInit {

  title: string = "معلومات عن الرحلة";
  constructor() { }

  ngOnInit() {}

}
