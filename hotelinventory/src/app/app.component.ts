import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomsComponent } from "./rooms/rooms.component";

@Component({
  selector: 'app-root',
  imports: [ CommonModule, RoomsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hotelinventory';

  role = 'Admin';
  // role = 'User';
  // role = 'Users';
}