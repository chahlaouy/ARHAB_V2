import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { CarComponent } from './cars/car/car.component';
import { CarsComponent } from './cars/cars.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NewRideComponent } from './rides/new-ride/new-ride.component';
import { RidesListComponent } from './rides/rides-list/rides-list.component';


const routes: Routes = [
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
    path: 'rides/new-ride',
    component: NewRideComponent
  },
  {
    path: 'rides/rides-list',
    component: RidesListComponent
  },
  {
    path: 'rides/:id',
    component: RidesListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaptainRoutingModule {}
