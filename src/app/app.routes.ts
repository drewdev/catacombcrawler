import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TransitionComponent } from './components/transition/transition.component';
import { GameComponent } from './components/game/game.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transition', component: TransitionComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'game', component: GameComponent }
];
