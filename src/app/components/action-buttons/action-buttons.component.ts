import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { damageEnemy, persuadeEnemy } from '../../state/actions/enemy.actions';
import { damagePlayer } from '../../state/actions/player.actions';
import { PlayerState } from '../../state/reducers/player.reducer';
import { EnemyState } from '../../state/reducers/enemy.reducer';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {

  diceRoll: number | null = null;

  constructor(private store: Store<{ player: PlayerState; enemy: EnemyState }>) {}

  rollDice() {
    this.diceRoll = Math.floor(Math.random() * 6) + 1;
  }

  onAttack() {
    this.rollDice();
    if (this.diceRoll) {
      this.store.dispatch(damageEnemy({ damage: this.diceRoll * 2 }));
      this.store.dispatch(damagePlayer({ damage: this.diceRoll }));
    }
  }

  onPersuade() {
    this.rollDice();
    if (this.diceRoll) {
      this.store.dispatch(persuadeEnemy({ persuasion: this.diceRoll * 10 }));
    }
  }

  onEscape() {
    this.rollDice();
    if (this.diceRoll === 6) {
    }
  }
}
