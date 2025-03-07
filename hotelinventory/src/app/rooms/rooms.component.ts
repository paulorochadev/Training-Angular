import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomList;
  roomList: RoomList[] = [];
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();
  subscription!: Subscription;
  totalbytes: number = 0;
  rooms: Room = { availableRooms: 10, bookedRooms: 5, totalRooms: 20 };
  title = 'Room List';
  stream = new Subject<string>();
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;
  private destroy$ = new Subject<void>();

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
      this.loadRooms();
      this.loadPhotos();
      this.setupStreams();
  }

  private loadRooms(): void {
      this.roomsService.getRooms().pipe(takeUntil(this.destroy$)).subscribe({
          next: (rooms) => this.roomList = rooms,
          error: (err) => {
              this.error$.next(err.message);
              console.error('Erro ao buscar quartos:', err);
          }
      });
  }

  private loadPhotos(): void {
      this.roomsService.getPhotos().pipe(takeUntil(this.destroy$)).subscribe((event) => {
          if (event.type === HttpEventType.DownloadProgress) {
              this.totalbytes += event.loaded;
          } else if (event.type === HttpEventType.Response) {
              console.log(event.body);
          }
      });
  }

  private setupStreams(): void {
      this.stream.next('user1');
      this.stream.next('user2');
      this.stream.next('user3');
      this.stream.complete();

      this.stream.pipe(takeUntil(this.destroy$)).subscribe({
          next: (value) => console.log(value),
          complete: () => console.log('complete'),
          error: (err) => console.log(err),
      });
  }

  ngAfterViewInit(): void {
      this.headerComponent.title = "Rooms View";
      if(this.headerChildrenComponent.last) {
          this.headerChildrenComponent.last.title = "Last Title";
      }
  }

  ngAfterViewChecked(): void {
      this.headerComponent.title = "Rooms View";
  }

  toggle() { this.hideRooms = !this.hideRooms; }
  selectRoom(room: RoomList) { this.selectedRoom = room; }

  addRoom() {
      const room: RoomList = {
          roomNumber: this.generateRoomNumber(), // Ou gere um número único
          roomType: 'Deluxe Room',
          amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
          price: 500,
          photos: '', // Ou uma URL de imagem
          checkinTime: new Date('2024-01-01T14:00:00'),
          checkoutTime: new Date('2024-01-02T12:00:00'),
          rating: 4.5
      };
      this.roomsService.addRoom(room).pipe(takeUntil(this.destroy$)).subscribe(rooms => this.roomList = rooms);
  }

  editRoom() {
      const room: RoomList = {
          roomNumber: '3', // Use o número do quarto a ser editado
          roomType: 'Suite',
          amenities: 'Jacuzzi, Private Balcony, King Bed',
          price: 1200,
          photos: '', // Ou uma URL de imagem
          checkinTime: new Date('2024-01-03T14:00:00'),
          checkoutTime: new Date('2024-01-04T12:00:00'),
          rating: 4.8
      };
      this.roomsService.editRoom(room).pipe(takeUntil(this.destroy$)).subscribe(rooms => this.roomList = rooms);
  }

  deleteRoom() {
      this.roomsService.delete('3').pipe(takeUntil(this.destroy$)).subscribe(rooms => this.roomList = rooms);
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  generateRoomNumber(): string {
      return Math.random().toString(36).substring(2, 9);
  }
}