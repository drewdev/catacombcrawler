import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { damageEnemy, persuadeEnemy, resetEnemy } from '../../state/actions/enemy.actions';
import { damagePlayer } from '../../state/actions/player.actions';
import { EnemyState } from '../../state/reducers/enemy.reducer';
import { PlayerState } from '../../state/reducers/player.reducer';
import { PlayerComponent } from '../player/player.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { EnemyComponent } from '../enemy/enemy.component';
import { RewardModalComponent } from '../reward-modal/reward-modal.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { DiceComponent } from '../dice/dice.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [PlayerComponent, EnemyComponent, ActionButtonsComponent, RewardModalComponent, TextBoxComponent, DiceComponent],
})
export class GameComponent {
  player$ = this.store.select('player');
  enemy$ = this.store.select('enemy');
  message: string = 'You encounter a Skeleton Warrior in the dungeon! What will you do?';
  showModal = false;
  @ViewChild(DiceComponent) diceComponent!: DiceComponent;
  diceRoll: number | undefined = undefined;

  constructor(private store: Store<{ player: PlayerState; enemy: EnemyState }>) {}

  // Método para tirar el dado y esperar a su resultado
  async rollDice(): Promise<number> {
    this.diceRoll = undefined; // Resetea el valor antes de la tirada
    const result = await this.diceComponent.rollDice();
    this.diceRoll = result;
    return result; // Retorna el resultado del dado
  }

  // Persuadir al enemigo
  async onPersuade() {
    this.message = 'You attempt to persuade the Skeleton Warrior...';
    const result = await this.rollDice();
    if (result > 4) {
      this.store.dispatch(persuadeEnemy({ persuasion: result * 10 }));
      this.message = 'The Skeleton hesitates, but you seem to convince him!';
    } else {
      this.message = 'Persuasion failed. The Skeleton is enraged and attacks!';
      this.store.dispatch(damagePlayer({ damage: result || 1 }));
    }
  }

  // Atacar al enemigo
  async onAttack() {
    this.message = 'You swing your sword at the Skeleton Warrior!';
    const result = await this.rollDice();
    if (result > 3) {
      const damage = result * 2;
      this.store.dispatch(damageEnemy({ damage }));
      this.message = `You dealt ${damage} damage to the Skeleton Warrior!`;

      // Verificamos si la salud del enemigo llegó a 0
      this.enemy$.subscribe((enemy) => {
        if (enemy.health <= 0) {
          this.message = 'You have defeated the Skeleton Warrior!';
          this.showModal = true; // Muestra el modal de recompensa
        }
      }).unsubscribe();
    } else {
      this.message = 'Your attack missed! The Skeleton counters!';
      this.store.dispatch(damagePlayer({ damage: result || 1 }));
    }
  }

  // Intentar escapar
  async onEscape() {
    this.message = 'You try to escape from the Skeleton Warrior...';
    const result = await this.rollDice();
    if (result === 6) {
      this.message = 'You successfully escaped!';
    } else {
      this.message = 'Escape failed! The Skeleton attacks you!';
      this.store.dispatch(damagePlayer({ damage: result || 1 }));
    }
  }

  // Función para manejar la selección de recompensa
  handleRewardSelection(equip: boolean) {
    if (equip) {
      // Aquí se manejaría el equipamiento de la recompensa
      this.message = 'You equipped the reward!';
    } else {
      this.message = 'You chose not to equip the reward.';
    }
    this.showModal = false; // Cierra el modal
    this.resetEnemy();      // Resetea al enemigo para la próxima pelea
  }

  // Resetea al enemigo después de ser derrotado
  resetEnemy() {
    this.store.dispatch(resetEnemy());
    this.message = 'A new enemy approaches...';
  }
}
