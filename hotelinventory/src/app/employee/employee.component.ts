import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  imports: [ CommonModule ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  // providers: [RoomsService]
})
export class EmployeeComponent implements OnInit {
  empName: string = 'John';
  rooms: any[] = []; // Ou use a interface RoomList[]
  
  // constructor(@Self() private roomsService: RoomsService) { }
  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
      this.roomsService.getRooms().subscribe(rooms => {
          this.rooms = rooms;
      });
  }
}