import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { CarComponent } from './cars/car/car.component';
import { CarsComponent } from './cars/cars.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SingleChatComponent } from './requests/chat/single-chat/single-chat.component';
import { RequestsComponent } from './requests/requests/requests.component';
import { RidesComponent } from './requests/rides/rides.component';
import { NewRideComponent } from './rides/new-ride/new-ride.component';
import { RideShowComponent } from './rides/ride-show/ride-show.component';
import { RidesListComponent } from './rides/rides-list/rides-list.component';


const routes: Routes = [
  {
    path: 'rides-requests',
    component: RidesComponent
  },
  {
    path: 'rides-requests/:id/requests',
    component: RequestsComponent
  },
  {
    path: 'rides-requests/:rideId/requests/:requestId/chat/:passengerId',
    component: SingleChatComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'cars/add-car',
    component: AddCarComponent
  },
  {
    path: 'cars/:id',
    component: CarComponent
  },
  {
    path: 'rides',
    component: RidesListComponent
  },
  {
    path: 'rides/new-ride',
    component: NewRideComponent
  },
  {
    path: 'rides/:id',
    component: RideShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaptainRoutingModule {}
