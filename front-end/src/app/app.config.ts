import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import {
  Cctv,
  Computer,
  icons,
  LucideAngularModule,
  Monitor,
  Network,
  PhoneCall,
  Printer,
  Projector,
  Rows4,
  Server,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Cctv,
        Projector,
        PhoneCall,
        Network,
        Monitor,
        Printer,
        Computer,
        Rows4,
        Server,
      })
    ),
  ],
};
