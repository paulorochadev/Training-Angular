import { InjectionToken } from "@angular/core";
import { LocalStorage } from "./localstorage.interface";

export const LocalStorageToken = new InjectionToken<LocalStorage>('local storage', {
    providedIn: 'root',
    factory() {
        return localStorage;
    }
});