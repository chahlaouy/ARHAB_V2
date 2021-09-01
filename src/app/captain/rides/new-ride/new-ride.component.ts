import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.scss'],
})
export class NewRideComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  title: string = "انشاء رحلة";

  error = null;
  titleAGM: string = 'AGM project';
  latitude: number;
  longitude: number;
  adminAreaLevel1: string;
  adminAreaLevel2: string;
  locality: string;
  zoom: number;
  address: string = null;
  private geoCoder;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place)

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
          place.address_components.forEach(item => {
            // console.log(item.types.indexOf("administrative_area_level_2"))
            // if ( item.types.indexOf("administrative_area_level_2") != -1){
            //   this.adminAreaLevel2 = item.long_name
            // }
            if (item.types.indexOf("locality") != -1) {
              this.locality = item.long_name
            }
            if (item.types.indexOf("administrative_area_level_1") != -1) {
              this.adminAreaLevel1 = item.long_name
            }
          })
          this.error = "error"
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  markerDragEnd($event: any) {
    // console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          // window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }

    });

  }
}
