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
  disableActions = false;

  constructor(private store: Store<{ player: PlayerState; enemy: EnemyState }>) {}

  // Método para tirar el dado y esperar a su resultado
  async rollDice(): Promise<number> {
    this.diceRoll = undefined; // Resetea el valor antes de la tirada
    this.disableActions = true;
    const result = await this.diceComponent.rollDice();
    this.diceRoll = result;
    setTimeout(() => {
      this.disableActions = false;
    }, 1000);
    return result; // Retorna el resultado del dado
  }

  // Persuadir al enemigo
  async onPersuade() {
    let enemyName = '';
    this.enemy$.subscribe((enemy) => {
      enemyName = enemy.name;
    }).unsubscribe();
    this.message = `You attempt to persuade the ${ enemyName }...`;
    const damage = await this.rollDice();
    if (damage > 3) {
      const persuasion = damage * 3
      this.store.dispatch(persuadeEnemy({ persuasion }));
      this.message = `The ${ enemyName } hesitates, but you seem to convince him!`;
      this.enemy$.subscribe((enemy) => {
        if (enemy.persuasion >= 100) {
          this.message = `You are now friends with the ${ enemyName }! He wants to give you a gift!`;
          this.showModal = true; // Muestra el modal de recompensa
        }
      }).unsubscribe();
    } else {
      this.message = `Persuasion failed. The ${ enemyName } is enraged and attacks! You missed ${ damage } hp`;
      this.store.dispatch(damagePlayer({ damage }));
    }
  }

  // Atacar al enemigo
  async onAttack() {
    let attack = 0;
    let def = 0;
    let enemyAttack = 0;
    let enemyDef = 0;
    let enemyName = '';
    this.player$.subscribe((player) => {
      attack = player.attack;
      def = player.defense;
    }).unsubscribe();
    this.enemy$.subscribe((enemy) => {
      enemyAttack = enemy.attack;
      enemyDef = enemy.defense;
      enemyName = enemy.name;
    }).unsubscribe();
    this.message = `You swing your sword at the ${ enemyName }!`;
    const result = await this.rollDice();
    if (result > 2) {
      const damage = result === 6 ? attack * 2 - enemyDef : attack + result - enemyDef;
      this.store.dispatch(damageEnemy({ damage }));
      this.message = result === 6 ? `Critical Hit! You dealt ${damage} damage to the ${ enemyName }!` : `You dealt ${damage} damage to the ${ enemyName }!`;
      // Verificamos si la salud del enemigo llegó a 0
      this.enemy$.subscribe((enemy) => {
        if (enemy.health <= 0) {
          this.message = `You have defeated the ${ enemyName } Warrior!`;
          this.showModal = true; // Muestra el modal de recompensa
        }
      }).unsubscribe();
    } else {
      const damage = result === 1 ? enemyAttack * 2 - def: enemyAttack + result - def;
      if (result === 1 && damage < 0) {
        this.message = `Even considering the power of your armor, the enemy manages to land a critical hit on you! You missed ${ enemyAttack } hp`;
      } else {
        this.message = damage > 0 ? `Your attack missed! The ${ enemyName } counters! You missed ${ damage } hp` :
      `Your attack missed! The ${ enemyName } counters! But your armor is too powerful! The Enemy's attack bounces off.`;
      }
      
      
      this.store.dispatch(damagePlayer({ damage }));
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
