import { createAction, props } from '@ngrx/store';
import { PlayerState } from '../reducers/player.reducer';

export const damageEnemy = createAction(
  '[Enemy] Damage Enemy',
  props<{ damage: number }>()
);

export const persuadeEnemy = createAction(
  '[Enemy] Persuade Enemy',
  props<{ persuasion: number }>()
);

export const resetEnemy = createAction(
  '[Enemy] Reset',
  props<{ player: PlayerState }>() // Aceptamos el estado del jugador como prop
);
