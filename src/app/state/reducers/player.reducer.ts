import { createReducer, on } from '@ngrx/store';
import { damagePlayer, healPlayer, updateArmor, updateInventory, updatePotion, updateReward, updateWeapon } from '../actions/player.actions';
import { reward } from '../../data/drop-tables';

export interface PlayerState {
  level: number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  inventory: {
    weapon: string;
    weaponDmg: number;
    weaponImage: string;
    armor: string;
    armorDef: number;
    armorImage: string;
    potions: number;
  };
  reward: reward
}

const initialPlayerState: PlayerState = {
  level: 1,
  name: 'Sir Shrek',
  health: 100,
  attack: 5,
  defense: 5,
  inventory: {
    weapon: 'Dagger',
    weaponDmg: 0,
    weaponImage: './reward/dagger.png',
    armor: 'Scraps Armor',
    armorDef: 0,
    armorImage: './reward/base-armor.png',
    potions: 3,
  },
  reward: {
    name: 'Sword',
    attack: 2,
    defense: 2,
    rarity: '',
    image: './player/sword.png',
  }
};

export const playerReducer = createReducer(
  initialPlayerState,
  on(damagePlayer, (state, { damage }) => ({
    ...state,
    health: Math.max(0, state.health - damage),
  })),
  on(healPlayer, (state, { heal }) => ({
    ...state,
    health: Math.min(100, state.health + heal),
  })),
  on(updateInventory, (state, { weapon, armor }) => ({
    ...state,
    inventory: { ...state.inventory, weapon, armor },
  })),
  on(updateWeapon, (state, { weapon, weaponDmg, weaponImage }) => ({
    ...state,
    attack: weaponDmg,
    weaponImage,
    inventory: { ...state.inventory, weapon, weaponDmg, weaponImage  },
  })),
  on(updateArmor, (state, { armor, armorDef, armorImage }) => ({
    ...state,
    defense: armorDef,
    armorImage,
    inventory: { ...state.inventory, armor, armorDef, armorImage },
  })),
  on(updateReward, (state, { reward }) => ({
    ...state,
    level: state.level + 1,
    reward
  })),
  on(updatePotion, (state, { potions }) => ({
    ...state,
    inventory: { ...state.inventory, potions: state.inventory.potions + potions },
  })),
);
