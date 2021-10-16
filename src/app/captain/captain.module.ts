import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptainRoutingModule } from './captain-routing.module';
import { FavoriteComponent } from './favorite/favorite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './cars/car/car.component';
import { IonicModule } from '@ionic/angular';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { NewRideComponent } from './rides/new-ride/new-ride.component';
import { RidesListComponent } from './rides/rides-list/rides-list.component';
import { RideShowComponent } from './rides/ride-show/ride-show.component';
import { SingleChatComponent } from './requests/chat/single-chat/single-chat.component';
import { ChatComponent } from './requests/chat/chat/chat.component';
import { WalletComponent } from './wallet/wallet/wallet.component';
import { TransactionsComponent } from './wallet/transactions/transactions.component';
import { HttpClientModule } from '@angular/common/http';
import { RidesReviewsComponent } from './reviews/rides-reviews/rides-reviews.component';
import { ReviewsComponent } from './reviews/reviews/reviews.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CaptainEffect } from './state/captain.effects';
import { CaptainReducer } from './state/captain.reducer';
import { CAPTAIN_STATE_NAME } from './state/captain.selectors';





@NgModule({
  declarations: [
    FavoriteComponent,
    CarsComponent,
    CarComponent,
    AddCarComponent,
    NewRideComponent,
    RidesListComponent,
    RideShowComponent,
    SingleChatComponent,
    ChatComponent,
    WalletComponent,
    TransactionsComponent,
    RidesReviewsComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    CaptainRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(CAPTAIN_STATE_NAME, CaptainReducer),
    EffectsModule.forFeature([CaptainEffect]),
  ]
})
export class CaptainModule { }
