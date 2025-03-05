import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from "./rooms/rooms.component";

@Component({
  selector: 'app-root',
  imports: [ ContainerComponent, CommonModule, EmployeeComponent, RoomsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
    console.log(this.name.nativeElement.innerText = "Hilton Hotel");
  }

  // role = 'Admin';
  // role = 'User';
  // role = 'Users';

  // @ViewChild('user', { read: ViewContainerRef } ) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);

  //   componentRef.instance.numberOfRooms = 50;
  // }
}