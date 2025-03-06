import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { RoomsListComponent } from "../rooms-list/rooms-list.component";
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  imports: [ CommonModule, HeaderComponent, RoomsListComponent ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  // Interpolation (Interpolação)
  hotelName = 'Hilton Hotel';
  
  // Property Binding (Texto Vinculativo) 
  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20
  }

  title = 'Room List';

  roomList: RoomList[] = []

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  // @ViewChild(HeaderComponent, { static: true }) headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  // roomService = new RoomsService();

  error: string = '';

  totalbytes: number = 0;

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

    // this.roomList = this.roomsService.getRooms();

    // this.stream.subscribe((data)=> console.log(data));

    // this.roomsService.getPhotos().subscribe((data) => {
    //   console.log(data);
    // })

    this.roomsService.getPhotos().subscribe((event) => {
      switch(event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        
        case HttpEventType.ResponseHeader: {
          console.log('Request Success!');
          break;
        }
        
        case HttpEventType.DownloadProgress: {
          this.totalbytes += event.loaded;
          break;
        }

        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    })

    console.log(this.roomsService.getRooms());

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });

    this.stream.subscribe((data) => console.log(data));

    // this.roomsService.getRooms$.subscribe(rooms => {
      this.roomsService.getRooms().subscribe(rooms => {
      this.roomList = rooms;
    })
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
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
      price: 500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5
    };

    // this.roomList.push(room);
    // this.roomList = [ ...this.roomList, room ];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kichen',
      price: 500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    })
  }
}

// getData -> addData -> getData

// getData -> continous stream of data -> addData
