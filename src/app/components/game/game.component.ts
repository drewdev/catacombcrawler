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
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [PlayerComponent, EnemyComponent, ActionButtonsComponent, RewardModalComponent, TextBoxComponent, DiceComponent, AsyncPipe],
})
export class GameComponent {
  player$ = this.store.select('player');
  enemy$ = this.store.select('enemy');
  message: string = 'You encounter an Enemy in the dungeon! What will you do?';
  showModal = false;
  @ViewChild(DiceComponent) diceComponent!: DiceComponent;
  diceRoll: number | undefined = undefined;
  disableActions = false;

  constructor(private store: Store<{ player: PlayerState; enemy: EnemyState }>) {}

  getBackgroundImage(level: number): string {
    if (level > 20) {
      return '/dragons.png';
    } else if (level > 15) {
      return '/specters.png';
    } else if (level > 10) {
      return '/vampire-level.png';
    } else if (level > 5) {
      return '/zombie.png';
    } else {
      return '/game.png';
    }
  }

  async rollDice(): Promise<number> {
    this.diceRoll = undefined;
    this.disableActions = true;
    const result = await this.diceComponent.rollDice();
    this.diceRoll = result;
    setTimeout(() => {
      this.disableActions = false;
    }, 600);
    return result;
  }

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
          this.showModal = true;
        }
      }).unsubscribe();
    } else {
      this.message = `Persuasion failed. The ${ enemyName } is enraged and attacks! You missed ${ damage } hp`;
      this.store.dispatch(damagePlayer({ damage }));
    }
  }

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
      this.enemy$.subscribe((enemy) => {
        if (enemy.health <= 0) {
          this.message = `You have defeated the ${ enemyName } Warrior!`;
          this.showModal = true;
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

  async onEscape() {
    this.message = 'You try to escape from the Skeleton Warrior...';
    const result = await this.rollDice();
    if (result === 6) {
      this.message = 'You successfully escaped!';
      this.showModal = true;
    } else {
      let damage = 0;
      let enemyName = '';
      this.enemy$.subscribe((enemy) => {
        damage = enemy.attack;
        enemyName = enemy.name;
      }).unsubscribe();
      damage = result === 1 ? damage * 3 : damage * 2;
      this.message = result === 1 ? 
        `You tripped while trying to escape! The ${ enemyName } deals you a fatal blow! You lose ${ damage } hp!`
        : `Escape failed! The ${ enemyName } attacks you! You lose ${ damage } hp!`;
      this.store.dispatch(damagePlayer({ damage }));
    }
  }

  handleRewardSelection(equip: boolean) {
    if (equip) {
      this.message = 'You equipped the reward!';
    } else {
      const potion = Math.round(Math.random() * 50);
      this.message = `You drink a potion! it recovers ${ potion } hp.`;
      this.store.dispatch(damagePlayer({ damage: -potion }));
    }
    this.showModal = false;
    this.resetEnemy();
  }

  resetEnemy() {
    this.player$.subscribe(player => {
      this.store.dispatch(resetEnemy({ player }));
    }).unsubscribe();
  }
}
