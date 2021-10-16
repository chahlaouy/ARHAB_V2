import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageRoutingModule } from './home-routing.module';
import { ListComponent } from './announcements/list/list.component';
import { DetailsComponent } from './announcements/details/details.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomeModule { }
