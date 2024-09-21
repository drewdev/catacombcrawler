import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { damageEnemy, persuadeEnemy, resetEnemy } from '../../state/actions/enemy.actions';
import { damagePlayer, updatePotion } from '../../state/actions/player.actions';
import { EnemyState } from '../../state/reducers/enemy.reducer';
import { PlayerState } from '../../state/reducers/player.reducer';
import { PlayerComponent } from '../player/player.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { EnemyComponent } from '../enemy/enemy.component';
import { RewardModalComponent } from '../reward-modal/reward-modal.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { DiceComponent } from '../dice/dice.component';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private store: Store<{ player: PlayerState; enemy: EnemyState }>,
    private router: Router,
    private http: HttpClient
  ) {}

  getBackgroundImage(level: number): string {
    if (level > 20) {
      return './dragons.png';
    } else if (level > 15) {
      return './specters.png';
    } else if (level > 10) {
      return './vampire-level.png';
    } else if (level > 5) {
      return './zombie.png';
    } else {
      return './game.png';
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

  checkPlayerDeath() {
    this.player$.subscribe(async player => {
      if (player.health <= 0) {
        setTimeout(() => {
          this.disableActions = true;
        }, 610);
        this.message = 'You are dead! 💀';
        const character = {
          name: player.name,
          level: player.level,
          inventory: {
            weapon: {
              attack: player.inventory.weaponDmg,
              name: player.inventory.weapon
            },
            armour: {
              defense: player.inventory.armorDef,
              name: player.inventory.armor
            }
          }
        }
        this.http.post('https://catacombcrawler-nestjs-production.up.railway.app/characters/create', character).subscribe({
          next: (response) => {
            console.log('Character created successfully', response);
            setTimeout(() => {
              this.router.navigate(['/leaderboard']);
            }, 4000);
          },
          error: (err) => {
            console.error('Error creating character', err);
          }
        });
      }
    }).unsubscribe();
  }

  async onPersuade() {
    let enemyName = '', persuasion = 0, enemyDmg = 0;
    this.enemy$.subscribe((enemy) => {
      enemyName = enemy.name;
      persuasion = enemy.persuasion;
      enemyDmg = enemy.attack;
    }).unsubscribe();
    if (persuasion >= 100) {
      this.message = `You are now friends with the ${ enemyName }! He wants to give you a gift!`;
      this.showModal = true;
    } else {
      this.message = `You attempt to persuade the ${ enemyName }...`;
      const damage = await this.rollDice();
      if (damage > 3) {
        if (damage === 6) {
          const persuasion = damage * 5;
          this.store.dispatch(persuadeEnemy({ persuasion }));
          this.message = `You told the ${ enemyName } a joke that made him laugh a lot!, His persuasion increases!`;
        } else {
          const persuasion = damage * 4;
          this.store.dispatch(persuadeEnemy({ persuasion }));
          this.message = `The ${ enemyName } hesitates, but you seem to convince him!`;
        }
      } else {
        if (damage === 1) {
          this.message = `The ${ enemyName } feels offended by your overconfidence! He is furious and delivers a devastating attack! You missed ${ enemyDmg } hp`;
          this.store.dispatch(damagePlayer({ damage }));
        } else {
          this.message = `Persuasion failed. The ${ enemyName } is enraged and attacks! You missed ${ damage * 5 } hp`;
          this.store.dispatch(damagePlayer({ damage }));
        }
      }
      this.checkPlayerDeath();  // Verificar si el jugador ha muerto
    }
  }

  async onAttack() {
    let attack = 0, def = 0, enemyAttack = 0, enemyDef = 0, enemyName = '';
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
    if (result > 3) {
      const damage = result === 6 ? Math.floor(attack * 2.5 - enemyDef) : attack + result - enemyDef;
      this.store.dispatch(damageEnemy({ damage }));
      this.message = result === 6 ? `Critical Hit! You dealt ${damage} damage to the ${ enemyName }!` : `You dealt ${damage} damage to the ${ enemyName }!`;
      this.enemy$.subscribe((enemy) => {
        if (enemy.health <= 0) {
          this.message = `You have defeated the ${ enemyName } Warrior!`;
          this.showModal = true;
        }
      }).unsubscribe();
    } else {
      const damage = result === 1 ? enemyAttack * 2 - def : enemyAttack + result - def;
      if (result === 1 && damage < 0) {
        this.message = `Even considering the power of your armor, the enemy manages to land a fatal hit on you! You missed ${ enemyAttack } hp`;
      } else if (result === 1) {
        this.message = `The ${ enemyName } dodges your attack, leaving you exposed! 
        The ${ enemyName }  delivers a devastating blow! You missed ${ damage } hp`;
      } else {
        this.message = damage > 0 ? `Your attack missed! The ${ enemyName } counters! You missed ${ damage } hp` :
        `Your attack missed! The ${ enemyName } counters! But your armor is too powerful! The Enemy's attack bounces off.`;
      }
      
      this.store.dispatch(damagePlayer({ damage }));
      this.checkPlayerDeath();  // Verificar si el jugador ha muerto
    }
  }

  async onDrinkPotion() {
    let potions = 0, level = 0, restore = 0, enemyDamage = 0, def = 0, health = 0;
    this.player$.subscribe((player) => {
      potions = player.inventory.potions;
      level = player.level;
      def = player.defense;
      health = player.health;
    }).unsubscribe();
    this.enemy$.subscribe((enemy) => {
      enemyDamage = enemy.attack;
    }).unsubscribe();
    if (health > 99) {
      this.message = `You don't seem to need to drink a potion right now...`;
    } else {
      this.message = `You drink one of your potions...`;
      const result = await this.rollDice();
      this.store.dispatch(updatePotion({ potions: -1 }));
      if (result > 5) {
        restore = Math.floor(Math.random() * (15 - 20 + 1) + 10 + result * 2 + level * 1.5); 
        this.message = `Critical! It restores ${ restore } hp!`;
      } else if (result < 3) {
        restore = Math.floor(Math.random() * (15 - 20 + 1) + 10 + result + level * 1.5); 
        this.message = `It restores ${ restore } hp, but the enemy takes advantage of your lowered guard and attacks! 
        You lose ${ Math.floor(enemyDamage - def / 2) } hp! `;
      } else {
        restore = Math.floor(Math.random() * (15 - 20 + 1) + 10 + result + level * 1.5); 
        this.message = `It restores ${ restore } hp!`;
      }
      this.store.dispatch(damagePlayer({ damage: -restore }));
      this.checkPlayerDeath();  // Verificar si el jugador ha muerto
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
      this.checkPlayerDeath();  // Verificar si el jugador ha muerto
    }
  }

  handleRewardSelection(equip: boolean) {
    if (equip) {
      this.message = 'You equipped the reward!';
    } else {
      this.store.dispatch(updatePotion({ potions: 1 }));
      this.message = `You add a potion to your inventory`;
    }
    this.showModal = false;
    setTimeout(() => {
      this.message = 'A new enemy approaches!'
    }, 1000);
    this.resetEnemy();
  }

  resetEnemy() {
    this.player$.subscribe(player => {
      this.store.dispatch(resetEnemy({ player }));
    }).unsubscribe();
  }
}
