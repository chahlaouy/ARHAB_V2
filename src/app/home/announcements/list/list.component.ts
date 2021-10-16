import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  title: string = "الإعلانات";
  subTitle: string = "أحدث الإعلانات"
  constructor() { }

  ngOnInit() {}

}
