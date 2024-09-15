import { createReducer, on } from '@ngrx/store';
import { damagePlayer, healPlayer, updateInventory } from '../actions/player.actions';

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
  };
}

const initialPlayerState: PlayerState = {
  level: 1,
  name: 'Sir Shrek',
  health: 100,
  attack: 10,
  defense: 5,
  inventory: {
    weapon: 'Sword',
    weaponDmg: 2,
    weaponImage: '/player/sword.png',
    armor: 'Iron Armor',
    armorDef: 2,
    armorImage: '/player/armor.png'
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
  }))
);
