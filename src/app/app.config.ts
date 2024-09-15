import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { enemyReducer } from './state/reducers/enemy.reducer';
import { playerReducer } from './state/reducers/player.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(CommonModule),
    provideClientHydration(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ player: playerReducer, enemy: enemyReducer }),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25, // Mantiene los últimos 25 estados
      logOnly: !isDevMode(), // Solo lectura en producción
      autoPause: true, // Pausa cuando la pestaña del navegador no está activa
    }),
  ]
};
