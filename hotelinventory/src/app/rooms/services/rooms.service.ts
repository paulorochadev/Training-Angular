import { Inject, Injectable } from '@angular/core';
import { AppConfig } from '../../AppConfig/appConfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appConfig.service';
import { RoomList } from '../rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [
    {
      roomNumber: 1,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
      price: 500,
      photos: 'testPhotos',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    },
    {
      roomNumber: 2,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
      price: 1000,
      photos: 'testPhotos2',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 3.45654,
    },
    {
      roomNumber: 3,
      roomType: 'Private Suite',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
      price: 15000,
      photos: 'testPhotos3',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 2.6,
    },
  ]

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig) { 
    console.log('Rooms Service Initialized...');
    // console.log(environment.apiEndpoint);
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    return this.roomList;
  }
}