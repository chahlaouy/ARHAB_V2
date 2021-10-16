import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCarStart } from '../../state/captain.actions';
import { CaptainState } from '../../state/captain.state';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {

  title: string = "أضف سيارة";


  userCar: FormGroup;

  brands= [
    {label: 'كيا', array: ['اوبتيما','سيراتو','كادينزا', 'سبورتاج','ريو','بيكانتو','كرنفال']},
    {label: 'مرسيدس', array: ['E','C','S','CLA','G','A','ML']},
    {label: 'تويوتا',array: ['كامري','لاند كروزر','كوزولا','يارس','اف جي','افالون',]},
    {label: 'هيونداي', array: ['النترا','سوناتا','اكسنت','توسان','ازيرا','جنسس','كريتا','i10']},
    {label: 'نيسان', array: ['باترول','صني','التيما','مكسيما','سنترا',]},
    {label: 'شيفروليه', array: ['كابرس','ماليبو','كروز','سبارك','لومينا','كمارو','اوبترا']},
    {label: 'لكزس', array: ['LX','ES','LS','GS','RX','IS','GX','NX','RC']},
    {label:   'جي ام سي' ,array: ['يوكن','سييرا','اكاديا','انفوي','سافانا','سفاري']},
    {label: 'فورد', array: ['تورس','فكتوريا','فيوجن','موستنغ','رانجر','ايدج','فلكس' ]},
    {label: 'بي إم دبليو',array: ['M','Z','7','5','X','6','4']},
    {label: 'بورش', array: ['كاين','GTS','بوكستر','ماكان','كايملن','other']},
    {label: 'أودي', array: ['M','Z','7','5','X','6','4']},
    {label: 'كرايسلر', array: ['C300','S300','M300','ج فوياجر','BT كروزر','SRT','C200']},
    {label: 'جيلي', array:  ['باندا','EC7','EC8','X7','GS','GC7','GX2']},
    {label: 'انفنتي', array: ['QX','FX','Q','G','M','JX']},
    {label: 'ام جي', array: ['RX','ZS', '3','5', '6']}
  
  ]

  modelArray= null;
  carReleaseYear= ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020',]


  constructor(
    private fb: FormBuilder,
    private store: Store<CaptainState>
  ) { }

  ngOnInit() {
    this.initializeForm();
  }


  initializeForm(){ 
    this.userCar = this.fb.group({
      brand: "",
      model: "",
      state: "",
      serialNumber: "",
      seatsNumber: "",
      paperImg: "",
      assuranceImg: "",
      lisenceImg: "",
      carImg: ""
    })
  }

  changeBrand(e){
    this.userCar.value.brand=e.target.value;
    this.brands.forEach(item => {
      if (item.label === e.target.value){
        this.modelArray = item.array
      }
    })
  }
  
  onCarImgChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userCar.patchValue({
        carImg: file
      });
    }
  }
  

  onLisenceImgChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userCar.patchValue({
        lisenceImg: file
      });
    }
  }
  

  onAssuranceImgChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userCar.patchValue({
        assuranceImg: file
      });
    }
  }
  

  onPaperImgChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userCar.patchValue({
        paperImg: file
      });
    }
  }

  onCarSubmit(){
    const car: any = new FormData();
    car.append('carImg', this.userCar.get('carImg').value);
    car.append('lisenceImg', this.userCar.get('lisenceImg').value);
    car.append('assuranceImg', this.userCar.get('assuranceImg').value);
    car.append('paperImg', this.userCar.get('paperImg').value);
    car.append('brand', this.userCar.get('brand').value);
    car.append('model', this.userCar.get('model').value);
    car.append('state', this.userCar.get('state').value);
    car.append('serialNumber', this.userCar.get('serialNumber').value);
    car.append('seatsNumber', this.userCar.get('seatsNumber').value);
    console.log(car.getAll("carImg"))
    this.store.dispatch(addCarStart({car}))
  }

}
