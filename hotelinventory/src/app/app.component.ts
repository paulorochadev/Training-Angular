import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { LocalStorageToken } from './localstorage.token';
import { LoggerService } from './logger.service';
import { RoomsComponent } from "./rooms/rooms.component";

@Component({
  selector: 'app-root',
  imports: [ CommonModule, RoomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // providers: [
  //   {
  //     provide: APP_SERVICE_CONFIG,
  //     useValue: APP_CONFIG
  //   }
  // ]
})
// export class AppComponent implements OnInit {
//   title = 'hotelinventoryapp';

//   @ViewChild('name', { static: true }) name!: ElementRef;

//   constructor(@Optional() private loggerService: LoggerService, @Inject(LocalStorageToken) private localStorage: any) { }

//   // ngOnInit(): void {
//   //   this.loggerService?.Log('AppComponent.ngOnInit()');
//   //   this.name.nativeElement.innerText = "Hilton Hotel";
//   //   // console.log(this.name.nativeElement.innerText = "Hilton Hotel");

//   //   this.localStorage.setItem('name', 'Hilton Hotel');
//   // }

//   ngOnInit(): void {
//     if (this.loggerService) {
//       this.loggerService.Log('AppComponent.ngOnInit()');
//     }
//     this.name.nativeElement.innerText = "Hilton Hotel";
//     this.localStorage.setItem('name', 'Hilton Hotel');
//   }

//   // role = 'Admin';
//   // role = 'User';
//   // role = 'Users';

//   // @ViewChild('user', { read: ViewContainerRef } ) vcr!: ViewContainerRef;

//   // ngAfterViewInit(): void {
//   //   const componentRef = this.vcr.createComponent(RoomsComponent);

//   //   componentRef.instance.numberOfRooms = 50;
//   // }
// }

export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService, @Inject(LocalStorageToken) private localStorage: any) { }

  ngOnInit(): void {
      if (this.loggerService) {
          this.loggerService.Log('AppComponent.ngOnInit()');
      }
      this.name.nativeElement.innerText = "Hilton Hotel";
      this.localStorage.setItem('name', 'Hilton Hotel');
      const storedName = this.localStorage.getItem('name');
      console.log('Stored Name:', storedName);
  }
}