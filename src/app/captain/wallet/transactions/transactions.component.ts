import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  title: string = "سجلى";
  subTitle: string = "سجل الايداعات";
  constructor() { }

  ngOnInit() {}

}
