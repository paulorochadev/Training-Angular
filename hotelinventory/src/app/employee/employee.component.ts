import { Component } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  // providers: [RoomsService]
})
export class EmployeeComponent {

  empName: string = 'John';

  // constructor(@Self() private roomsService: RoomsService) { }
  constructor(private roomsService: RoomsService) { }

}