import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Room, RoomList } from './rooms';

@Component({
  selector: 'app-rooms',
  imports: [ CommonModule ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  // Interpolation (Interpolação)
  hotelName = 'Hilton Hotel';
  
  // Property Binding (Texto Vinculativo) 
  numberOfRooms = 10;

  hideRooms = false;

  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20
  }

  roomList: RoomList[] = []

  constructor() {}

  ngOnInit(): void {
    this.roomList = [
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
  }
  
  // Event Binding (Evento Vinculativo)
  toggle() {
    this.hideRooms = !this.hideRooms;
  }
}
