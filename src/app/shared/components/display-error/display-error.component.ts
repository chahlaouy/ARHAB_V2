import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { setErrorMessages } from '../../store/shared.actions';

@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent implements OnInit {

  @Input() errorMessages: string[];
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log(this.errorMessages);
  }
  closeErrorMessagesDialog(){
    this.store.dispatch(setErrorMessages({errorMessages: null}));
  }

}
