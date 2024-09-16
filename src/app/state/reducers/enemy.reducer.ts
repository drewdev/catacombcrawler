import { createReducer, on } from "@ngrx/store";
import { damageEnemy, persuadeEnemy, resetEnemy } from "../actions/enemy.actions";

export interface EnemyState {
  name: string;
  health: number;
  maxHealth: number;
  persuasion: number;
  attack: number;
  defense: number;
}

const initialEnemyState: EnemyState = {
  name: 'Skeleton Warrior',
  health: 30,
  maxHealth: 30,
  persuasion: 0,
  attack: 8,
  defense: 3
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
  on(resetEnemy, (state) => ({
    ...state,
    ...initialEnemyState
    ,
  }))
);
