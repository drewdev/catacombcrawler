import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { startGame, attackEnemy } from './state/actions/game.actions';
import { GameState } from './state/reducers/game.reducer';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  characters: any[] = [];
  constructor(
    private store: Store<{ gameState: GameState }>,
  ) {}

  startGame() {
    this.store.dispatch(startGame());
  }

  attackEnemy() {
    this.store.dispatch(attackEnemy({ damage: 10 }));
  }
}
