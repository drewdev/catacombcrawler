import { createAction, props } from '@ngrx/store';

export const damageEnemy = createAction(
  '[Enemy] Damage Enemy',
  props<{ damage: number }>()
);

export const persuadeEnemy = createAction(
  '[Enemy] Persuade Enemy',
  props<{ persuasion: number }>()
);

export const resetEnemy = createAction(
  '[Enemy] Reset Enemy',
);
