import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { RidesService } from '../../services/rides.service';

@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.scss'],
})
export class NewRideComponent implements OnInit {

  @ViewChild('source')
  public sourceElementRef: ElementRef;
  @ViewChild('destination')
  public destinationElementRef: ElementRef;

  title: string = "انشاء رحلة";


  lessThan100Km: any;
  between100And200Km: any;
  between200And300Km: any;
  between300And700Km: any;
  moreThan700Km: any;

  minPermittedPrice: any;
  maxPermittedPrice: any;

  priceInRiyal: any;

  error = null;
  titleAGM: string = 'AGM project';
  /** Ride Information */ 
  source = {
    latitude: 0,
    longitude: 0 ,
    adminAreaLevel1: "",
    adminAreaLevel2: "",
    locality: ""
  }
  destination = {
    latitude: 0,
    longitude: 0 ,
    adminAreaLevel1: "",
    adminAreaLevel2: "",
    locality: ""
  }

  ridePrice: any = 0;

  rideDistance: any = {
    text: "0 كلم",
    value: 0
  };

  rideAverageDuration: any = {
    text: "0",
    value: 0
  };

  rideNumberOfSeats: any = 0;

  rideDate: any = "10-10-2021";
  
  rideHour: any = "09:00";

  rideCarId: any = null;

  /** Ride Information */ 
  zoom: number;
  address: string = null;


  private geoCoder;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private rideService: RidesService
  ) { }

  ngOnInit() { }

  increaseNumberOfSeats(){
    if(this.rideNumberOfSeats > 2){
      return;
    }
    this.rideNumberOfSeats++
  }

  decreaseNumberOfSeats(){
    if(this.rideNumberOfSeats < 1){
      return;
    }
    this.rideNumberOfSeats--
  }


  persistRide(){
    this.rideService.addRide({
      rideSource: this.source, 
      rideDestination: this.destination,
      rideCarId: this.rideCarId,
      rideNumberOfSeats: this.rideNumberOfSeats,
      rideDate: this.rideDate,
      rideAverageDuration: this.rideAverageDuration,
      rideDistance: this.rideDistance,
      ridePrice: this.ridePrice,
      rideHour: this.rideHour
    });
  }

  increasePrice(){
    if(this.ridePrice > this.maxPermittedPrice){
      return;
    }
    this.ridePrice++
  }

  decreasePrice(){
    if(this.ridePrice < this.minPermittedPrice){
      return;
    }
    this.ridePrice--
  }

  ngAfterViewInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let sourceAutocomplete = new google.maps.places.Autocomplete(this.sourceElementRef.nativeElement);
      sourceAutocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = sourceAutocomplete.getPlace();
          // console.log(place)

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.source.latitude = place.geometry.location.lat();
          this.source.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
          place.address_components.forEach(item => {
            if ( item.types.indexOf("administrative_area_level_2") != -1){
              this.source.adminAreaLevel2 = item.long_name
            }
            if (item.types.indexOf("locality") != -1) {
              this.source.locality = item.long_name
            }
            if (item.types.indexOf("administrative_area_level_1") != -1) {
              this.source.adminAreaLevel1 = item.long_name
            }
          })
          this.error = "error"
          this.zoom = 12;
        });
      });
    
    

      let destinationAutocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement);
      destinationAutocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = destinationAutocomplete.getPlace();
          // console.log(place)

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.destination.latitude = place.geometry.location.lat();
          this.destination.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;

          place.address_components.forEach(item => {
            if ( item.types.indexOf("administrative_area_level_2") != -1){
              this.destination.adminAreaLevel2 = item.long_name
            }
            if (item.types.indexOf("locality") != -1) {
              this.destination.locality = item.long_name
            }
            if (item.types.indexOf("administrative_area_level_1") != -1) {
              this.destination.adminAreaLevel1 = item.long_name
            }
          })
          this.getRideDistanceAndAverageDuration(this.source, this.destination);
          
          
          this.error = "error"
          this.zoom = 12;
        });
      });
    });
  } 
  // getRideDistanceAndAverageDuration
  getRideDistanceAndAverageDuration(source: any, destination: any) {
    this.mapsAPILoader.load().then(() => {
      let service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [{ lat: source.latitude, lng: source.longitude }],
        destinations: [{ lat: destination.latitude, lng: destination.longitude }],
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (resp, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          this.rideDistance = {
            text: resp.rows[0].elements[0].distance.text,
            value: resp.rows[0].elements[0].distance.value
          }
          this.rideAverageDuration = {
            text: resp.rows[0].elements[0].duration.text,
            value: resp.rows[0].elements[0].duration.value
          }
          this.lessThan100Km = (this.rideDistance.value/1000) < 100;
          this.between100And200Km = (this.rideDistance.value/1000) > 100 && (this.rideDistance.value/1000) < 200;
          console.log(this.between100And200Km)
          this.between200And300Km = (this.rideDistance.value/1000) > 200 && (this.rideDistance.value/1000) < 300;
          this.between300And700Km = (this.rideDistance.value/1000) >= 300 && (this.rideDistance.value/1000) < 700;
          this.moreThan700Km = (this.rideDistance.value/1000) >= 700;
          this.getPermittedPrices();
          this.ridePrice = this.priceInRiyal;
        }
      })
    })
  }


  getPermittedPrices(){
    if ( this.lessThan100Km ){
      this.priceInRiyal = (this.rideDistance.value/1000) / 2;
      let percentPriceInriyal = (this.priceInRiyal*10) / 100;
      let minPrice = this.priceInRiyal - percentPriceInriyal;
      let maxPrice = this.priceInRiyal + percentPriceInriyal;
      this.minPermittedPrice = Math.round(minPrice);
      this.maxPermittedPrice = Math.round(maxPrice);
      this.priceInRiyal = Math.round(this.priceInRiyal);
    }

    if ( this.between100And200Km ){
      this.priceInRiyal = (this.rideDistance.value/1000) / 2.5 ;
      let percentPriceInriyal = (this.priceInRiyal*10) / 100;
      let minPrice = this.priceInRiyal - percentPriceInriyal;
      let maxPrice = this.priceInRiyal + percentPriceInriyal;
      this.minPermittedPrice = Math.round(minPrice);
      this.maxPermittedPrice = Math.round(maxPrice);
      this.priceInRiyal = Math.round(this.priceInRiyal);
      
    }

    if ( this.between200And300Km ){
      this.priceInRiyal = (this.rideDistance.value/1000) / 2.8571;
      let percentPriceInriyal = (this.priceInRiyal*10)/100;
      let minPrice = this.priceInRiyal - percentPriceInriyal;
      let maxPrice = this.priceInRiyal + percentPriceInriyal;
      this.minPermittedPrice = Math.round(minPrice);
      this.maxPermittedPrice = Math.round(maxPrice);
      this.priceInRiyal = Math.round(this.priceInRiyal);
    }

    if ( this.between300And700Km ){
      this.priceInRiyal = (this.rideDistance.value/1000) / 3.3333;
      let percentPriceInriyal = (this.priceInRiyal*10) / 100;
      let minPrice = this.priceInRiyal - percentPriceInriyal;
      let maxPrice = this.priceInRiyal + percentPriceInriyal;
      this.minPermittedPrice = Math.round(minPrice);
      this.maxPermittedPrice = Math.round(maxPrice);
      this.priceInRiyal = Math.round(this.priceInRiyal);
    }

    if ( this.moreThan700Km ){
      this.priceInRiyal = (this.rideDistance.value/1000) / 4;
      let percentPriceInriyal = (this.priceInRiyal*10) / 100;
      let minPrice = this.priceInRiyal - percentPriceInriyal;
      let maxPrice = this.priceInRiyal + percentPriceInriyal;
      this.minPermittedPrice = Math.round(minPrice);
      this.maxPermittedPrice = Math.round(maxPrice);
      this.priceInRiyal = Math.round(this.priceInRiyal);
    }
  }

  
}


  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 15;
  //     });
  //   }
  // }

  // markerDragEnd($event: any) {
  //   // console.log($event);
  //   this.latitude = $event.latLng.lat();
  //   this.longitude = $event.latLng.lng();
  //   this.getAddress(this.latitude, this.longitude);
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }