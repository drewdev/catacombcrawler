import { createAction, props } from '@ngrx/store';

export const startGame = createAction('[Game] Start');
export const attackEnemy = createAction('[Game] Attack Enemy', props<{ damage: number }>());
