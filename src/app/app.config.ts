import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from '../core/interceptor/header-interceptor';
import { errorInterceptor } from '../core/interceptor/error-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from '../core/interceptor/loading-interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    provideHttpClient(withFetch() , withInterceptors([headerInterceptor ,errorInterceptor ,loadingInterceptor])),
    importProvidersFrom(CookieService , NgxSpinnerModule),
    provideAnimations(),
    provideToastr(),





  ]
};
