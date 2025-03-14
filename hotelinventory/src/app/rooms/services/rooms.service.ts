import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { AppConfig } from '../../AppConfig/appConfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appConfig.service';
import { RoomList } from '../rooms';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    roomList: RoomList[] = [];

    constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private _http: HttpClient) {
        console.log('Rooms Service Initialized...');
        console.log('API Endpoint:', this.config.apiEndpoint);
    }

    getRooms(): Observable<RoomList[]> {
        const headers = new HttpHeaders({ 'token': '123456789ABCDE' });
        return this._http.get<RoomList[]>(`${this.config.apiEndpoint}/rooms`, { headers: headers }).pipe(
            shareReplay(1),
            catchError(this.handleError)
        );
    }

    addRoom(room: RoomList): Observable<RoomList[]> {
        return this._http.post<RoomList[]>(`${this.config.apiEndpoint}/rooms`, room).pipe(
            catchError(this.handleError)
        );
    }

    editRoom(room: RoomList): Observable<RoomList[]> {
        return this._http.put<RoomList[]>(`${this.config.apiEndpoint}/rooms/${room.roomNumber}`, room).pipe(
            catchError(this.handleError)
        );
    }

    delete(id: string): Observable<RoomList[]> {
        return this._http.delete<RoomList[]>(`${this.config.apiEndpoint}/rooms/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    getPhotos(): Observable<HttpEvent<any>> {
        const request = new HttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/photos',
            { reportProgress: true }
        );
        return this._http.request(request).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        let errorMessage = 'Something went wrong; please try again later.';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else if (error.status) {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }
}