import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {

  title: string = "تفضيلاتي";
  userFavorite: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.userFavorite = this.fb.group({
      pets: false,
      smoking: false,
      music: false,
      chat: false
    })
  }

  onFavoriteSubmit(){
    
  }

}
