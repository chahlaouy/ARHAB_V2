import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  title: string = "محفظتي";
  subTitle: string = "محفظتي و سجل الايداعات";
  constructor() { }

  ngOnInit() {}

}
