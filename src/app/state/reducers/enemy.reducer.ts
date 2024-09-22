import { createReducer, on } from '@ngrx/store';
import { damageEnemy, persuadeEnemy, resetEnemies, resetEnemy } from '../actions/enemy.actions';
import { enemies } from '../../data/enemies';
import { PlayerState } from '../reducers/player.reducer';

export interface EnemyState {
  name: string;
  enemyImg: string;
  health: number;
  maxHealth: number;
  persuasion: number;
  attack: number;
  defense: number;
  enemyType: string;
  lastEnemyName?: string;
}

const initialEnemyState: EnemyState = {
  name: 'Skeleton Warrior',
  enemyImg: './enemies/spooky-skeleton.webp',
  health: 25,
  maxHealth: 25,
  persuasion: 0,
  attack: 9,
  defense: 3,
  enemyType: 'skeleton',
  lastEnemyName: undefined
};

export const enemyReducer = createReducer(
  initialEnemyState,
  on(damageEnemy, (state, { damage }) => ({
    ...state,
    health: Math.max(0, state.health - damage),
  })),
  on(persuadeEnemy, (state, { persuasion }) => ({
    ...state,
    persuasion: Math.min(100, state.persuasion + persuasion),
  })),
  
  on(resetEnemy, (state, { player }: { player: PlayerState }) => {
    let possibleEnemies = enemies.filter(
      (enemy) => player.level >= enemy.levelRange[0] && player.level <= enemy.levelRange[1]
    );

    possibleEnemies = possibleEnemies.filter(
      (enemy) => enemy.name !== state.lastEnemyName
    );

    if (possibleEnemies.length === 0) {
      possibleEnemies = enemies.filter(
        (enemy) => player.level >= enemy.levelRange[0] && player.level <= enemy.levelRange[1]
      );
    }

    const randomEnemy = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];

    return {
      ...state,
      ...randomEnemy,
      health: randomEnemy.maxHealth,
      persuasion: 0,
      lastEnemyName: randomEnemy.name
    };
  }),
  on(resetEnemies, () => initialEnemyState)
);
