// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    // Conserva los providers que ya tengas en appConfig
    ...(appConfig.providers || []),
    // Añade HttpClientModule para que HttpClient esté disponible
    importProvidersFrom(HttpClientModule)
  ]
})
  .catch((err) => console.error(err));