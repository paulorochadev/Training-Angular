import { provideHttpClient } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { provideRouter } from "@angular/router";
import { environment } from "../../environments/environment";
import { routes } from "../app.routes";
import { AppConfig } from "./appConfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
    apiEndpoint: environment.apiEndpoint
};

export const appConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        {
            provide: APP_SERVICE_CONFIG,
            useValue: APP_CONFIG
        }
    ]
};