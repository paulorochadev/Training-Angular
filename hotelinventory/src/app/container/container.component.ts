import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomList } from '../rooms/rooms';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  imports: [ CommonModule ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  providers: [RoomsService]
})
export class ContainerComponent implements AfterContentInit, OnInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  rooms: RoomList[] = [];

  constructor(@Host() private roomsService: RoomsService) { }

  ngOnInit(): void {
      this.roomsService.getRooms().subscribe({
          next: (rooms) => {
              this.rooms = rooms;
          },
          error: (err) => {
              console.error('Erro ao buscar quartos:', err);
          }
      });
  }

  ngAfterContentInit(): void {
      console.log(this.employee);
      this.employee.empName = 'Rick';
  }
}