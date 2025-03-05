import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RoomsListComponent } from "../rooms-list/rooms-list.component";
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, HeaderComponent, RoomsListComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  // Interpolation (Interpolação)
  hotelName = 'Hilton Hotel';
  
  // Property Binding (Texto Vinculativo) 
  numberOfRooms = 10;

  hideRooms = false;

  selectedRoom!: RoomList;

  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20
  }

  title = 'Room List';

  roomList: RoomList[] = []

  // @ViewChild(HeaderComponent, { static: true }) headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  // roomService = new RoomsService();

  constructor(@SkipSelf() private roomsService: RoomsService) {

  }

  // constructor(private roomsService: RoomsService) {

  // }

  ngOnInit(): void {
    // console.log(this.headerComponent);

    // this.roomList = [
    //   {
    //     roomNumber: 1,
    //     roomType: 'Deluxe Room',
    //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
    //     price: 500,
    //     photos: 'testPhotos',
    //     checkinTime: new Date('11-Nov-2021'),
    //     checkoutTime: new Date('12-Nov-2021'),
    //     rating: 4.5,
    //   },
    //   {
    //     roomNumber: 2,
    //     roomType: 'Deluxe Room',
    //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
    //     price: 1000,
    //     photos: 'testPhotos2',
    //     checkinTime: new Date('11-Nov-2021'),
    //     checkoutTime: new Date('12-Nov-2021'),
    //     rating: 3.45654,
    //   },
    //   {
    //     roomNumber: 3,
    //     roomType: 'Private Suite',
    //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
    //     price: 15000,
    //     photos: 'testPhotos3',
    //     checkinTime: new Date('11-Nov-2021'),
    //     checkoutTime: new Date('12-Nov-2021'),
    //     rating: 2.6,
    //   },
    // ]

    this.roomList = this.roomsService.getRooms();
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = "Rooms View";

    // console.log(this.headerChildrenComponent.last.title = "Last Title");
    this.headerChildrenComponent.last.title = "Last Title";

    // this.headerChildrenComponent.get(0)?.title = "First Title";
  }

  ngAfterViewChecked(): void {
    this.headerComponent.title = "Rooms View";
  }
  
  // Event Binding (Evento Vinculativo)
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    // console.log(room);
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: 4,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
      price: 500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5
    };

    // this.roomList.push(room);
    this.roomList = [ ...this.roomList, room ];
  }
}
