import { createAction, props } from '@ngrx/store';
import { reward } from '../../data/drop-tables';

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

export const updateWeapon = createAction(
  '[Player] Update Weapon',
  props<{ weapon: string, weaponDmg: number, weaponImage:string }>()
);

export const updateArmor = createAction(
  '[Player] Update Armour',
  props<{ armor: string, armorDef: number, armorImage: string }>()
);

export const updateReward = createAction(
  '[Player] Update Reward',
  props<{ reward: reward }>()
);

export const updatePotion = createAction(
  '[Player] Update Potions',
  props<{ potions: number }>()
);

export const updatePlayerName = createAction(
  '[Player] Update Player Name',
  props<{ name: string }>()
);