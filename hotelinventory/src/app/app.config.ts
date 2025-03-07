import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { APP_SERVICE_CONFIG } from './AppConfig/appConfig.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_SERVICE_CONFIG,
      useValue: { apiEndpoint: environment.apiEndpoint }
    }
  ]
};