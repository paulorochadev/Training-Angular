import { InjectionToken } from "@angular/core";
import { environment } from "../../environments/environment";
import { AppConfig } from "./appConfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
    apiEndpoint: environment.apiEndpoint
};