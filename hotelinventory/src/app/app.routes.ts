import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';

export const routes: Routes = [
    { path: 'employee', component: EmployeeComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: '', redirectTo: '/rooms', pathMatch: 'full' }
];
