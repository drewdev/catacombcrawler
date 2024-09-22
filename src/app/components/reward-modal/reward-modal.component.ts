import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { dragonDropTable, reward, skeletonDropTable, specterDropTable, vampireDropTable, zombieDropTable /* Add other drop tables */ } from '../../data/drop-tables';
import { Observable } from 'rxjs';
import { PlayerState } from '../../state/reducers/player.reducer';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { updateArmor, updateReward, updateWeapon } from '../../state/actions/player.actions';
import { EnemyState } from '../../state/reducers/enemy.reducer';

@Component({
  selector: 'app-reward-modal',
  standalone: true,
  templateUrl: './reward-modal.component.html',
  styleUrls: ['./reward-modal.component.scss'],
  imports: [AsyncPipe]
})
export class RewardModalComponent implements OnInit {
  reward$: Observable<PlayerState>;
  enemy$:  Observable<EnemyState>;
  reward = {
    name: 'skeleton sword'
  };

  @Output() onRewardSelection = new EventEmitter<boolean>();

  constructor(private store: Store<{ player: PlayerState, enemy: EnemyState }>) {
    this.reward$ = this.store.select('player');
    this.enemy$ = this.store.select('enemy');
  }

  ngOnInit() {
    this.onEnemyDefeated();
  }

  selectReward(equip: boolean, reward: reward, weapon?: number) {
    if (equip) {
      weapon ? 
      this.store.dispatch(updateWeapon({ weapon: reward.name, weaponDmg: reward.attack, weaponImage: reward.image })) :
      this.store.dispatch(updateArmor({ armor: reward.name, armorDef: reward.defense, armorImage: reward.image }));
    } else {
      return this.onRewardSelection.emit(false);
    }
    this.onRewardSelection.emit(true);
  }

  getRewardType() {
    const random = Math.random();
    return random > 0.5 ? 'weapon' : 'armor';
  }

  getRandomReward(dropTable: any, type: 'weapon' | 'armor') {
    const rewards = dropTable[type];
    const random = Math.random();
    let accumulatedProbability = 0;
    
    for (const reward of rewards) {
      accumulatedProbability += reward.probability;
      if (random <= accumulatedProbability) {
        return reward;
      }
    }
    return rewards[0];
  }

  getDropTableByEnemyType(type: string) {
    console.log('type is: ', type)
    switch (type) {
      case 'skeleton':
        return skeletonDropTable;
      case 'zombie':
        return zombieDropTable;
      case 'vampire':
        return vampireDropTable;
      case 'spectre':
        return specterDropTable;
      case 'dragon':
        return dragonDropTable;
      default:
        return skeletonDropTable;
    }
  }

  showReward(reward: { name: string, attack: number, defense: number, rarity: string, image: string }) {
    let stats = `Rarity: ${reward.rarity}\n`;
    stats += reward.attack !== 0 ? `Attack: ${reward.attack}` : `Defense: ${reward.defense}`;
    console.log(`You found: ${reward.name}\n${stats}`);
    this.store.dispatch(updateReward({ reward }));
  }

  onEnemyDefeated() {
    let enemyType = 'skeleton';
    this.enemy$.subscribe((enemy) => {
      enemyType = enemy.enemyType;
    })
    const dropTable = this.getDropTableByEnemyType(enemyType);
    const rewardType = this.getRewardType();
    const reward = this.getRandomReward(dropTable, rewardType);
    this.showReward(reward);
  }
}
