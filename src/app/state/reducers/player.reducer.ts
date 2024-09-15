import { createReducer, on } from '@ngrx/store';
import { damagePlayer, healPlayer, updateInventory } from '../actions/player.actions';

export interface PlayerState {
  health: number;
  attack: number;
  defense: number;
  inventory: {
    weapon: string;
    weaponImage: string;
    armor: string;
    armorImage: string;
  };
}

const initialPlayerState: PlayerState = {
  health: 100,
  attack: 10,
  defense: 5,
  inventory: {
    weapon: 'Sword',
    weaponImage: '/player/sword.png',
    armor: 'Iron Armor',
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
