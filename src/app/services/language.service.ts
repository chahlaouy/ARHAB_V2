import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private validation: any = {
    required: 'خانة اجبارية',
    email: 'الرجاء التثبت من  البريد الكتروني'
  }
  constructor() { }

  getValidation(){
    return this.validation
  }
}
