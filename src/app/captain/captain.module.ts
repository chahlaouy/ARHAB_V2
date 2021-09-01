import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptainRoutingModule } from './captain-routing.module';
import { FavoriteComponent } from './favorite/favorite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './cars/car/car.component';
import { IonicModule } from '@ionic/angular';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { NewRideComponent } from './rides/new-ride/new-ride.component';
import { RidesListComponent } from './rides/rides-list/rides-list.component';



@NgModule({
  declarations: [
    FavoriteComponent,
    CarsComponent,
    CarComponent,
    AddCarComponent,
    NewRideComponent,
    RidesListComponent
  ],
  imports: [
    CommonModule,
    CaptainRoutingModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class CaptainModule { }
