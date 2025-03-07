import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from './localstorage.interface';
import { LocalStorageToken } from './localstorage.token';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor(@Inject(LocalStorageToken) private localStorage: LocalStorage) { }

    getItem(key: string): string | null {
        return this.localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        this.localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }

    clear(): void {
        this.localStorage.clear();
    }
}