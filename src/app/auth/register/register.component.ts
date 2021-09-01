import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { LanguageService } from '../../services/language.service';
import { registerStart } from '../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  authError: any;
  validations: any;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private langService: LanguageService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.initializeForm();
    this.validations = this.langService.getValidation()
    // this.firebaseService.eventAuthError$.subscribe(data => {
    //   this.authError = data;
    // })
  }
  
  initializeForm(){
    this.loginForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }
  onRegisterSubmit(){
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const email = this.loginForm.value.email;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(registerStart({username, email, password}));

  }

}
