import { createReducer, on } from '@ngrx/store';
import { startGame, attackEnemy } from './../actions/game.actions';

export interface GameState {
  gameStarted: boolean;
  playerHealth: number;
}

const initialState: GameState = {
  gameStarted: false,
  playerHealth: 100,
};

export const gameReducer = createReducer(
  initialState,
  on(startGame, (state) => ({ ...state, gameStarted: true })),
  on(attackEnemy, (state, { damage }) => ({ ...state, playerHealth: state.playerHealth - damage })),
);
