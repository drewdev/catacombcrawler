import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TransitionComponent } from './components/transition/transition.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transition', component: TransitionComponent },
  { path: 'game', component: GameComponent },
  // Otras rutas...
];
