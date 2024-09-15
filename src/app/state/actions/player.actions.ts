import { createAction, props } from '@ngrx/store';

export const damagePlayer = createAction(
  '[Player] Damage Player',
  props<{ damage: number }>()
);

export const healPlayer = createAction(
  '[Player] Heal Player',
  props<{ heal: number }>()
);

export const updateInventory = createAction(
  '[Player] Update Inventory',
  props<{ weapon: string; armor: string }>()
);
