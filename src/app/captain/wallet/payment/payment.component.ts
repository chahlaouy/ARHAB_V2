import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  title: string = "صفحة الدفع";
  subTitle: string = "صفحة الدفع";

  checkoutId: any
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.createForm();
  }

  renderPaymentform(){
    // const headers= new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Accept', 'application/json')
    // .set('Access-Control-Allow-Origin', '*');
    const amount: number = 124;
    this.http.get<any>("http://digigate.tn/checkout?amount=" + amount).subscribe(res => {
      console.log(res.id);
      this.checkoutId = res.id;
      this.createForm();
    })     
  }

  createForm(){
    const script = document.createElement("script");

    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=FA3786DCEDD1AEE093B8D39389B698E8.uat01-vm-tx04`;
    // ${this.checkoutId}
    script.async = true;
    document.body.appendChild(script);
    const form = document.createElement("form")
    const formId = document.getElementById("form")
    form.action = "http://digigate.tn/result";
    form.setAttribute("data-brands", "VISA MASTER MADA")
    formId.appendChild(form);
    form.setAttribute("class", "paymentWidgets");
  }
}
