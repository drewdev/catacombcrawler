import { createReducer, on } from '@ngrx/store';
import { damageEnemy, persuadeEnemy, resetEnemy } from '../actions/enemy.actions';
import { enemies } from '../../data/enemies';  // Importamos la tabla de enemigos
import { PlayerState } from '../reducers/player.reducer'; // Importamos el estado del jugador para acceder a su nivel

export interface EnemyState {
  name: string;
  enemyImg: string;
  health: number;
  maxHealth: number;
  persuasion: number;
  attack: number;
  defense: number;
  enemyType: string; 
}

const initialEnemyState: EnemyState = {
  name: 'Skeleton Warrior',
  enemyImg: '/enemies/spooky-skeleton.gif',
  health: 25,
  maxHealth: 25,
  persuasion: 0,
  attack: 8,
  defense: 3,
  enemyType: 'skeleton' 
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
  // Nuevo: Actualizar el enemigo basado en el nivel del jugador
  on(resetEnemy, (state, { player }: { player: PlayerState }) => {
    // Find a random enemy based on player's level
    const possibleEnemies = enemies.filter(
      (enemy) => player.level >= enemy.levelRange[0] && player.level <= enemy.levelRange[1]
    );
    
    // Pick a random enemy from the filtered list
    const randomEnemy = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];

    // Return the new enemy state
    return {
      ...state,
      ...randomEnemy, // Update the enemy with the new selected enemy
      health: randomEnemy.maxHealth, // Reset the health to maxHealth
      persuasion: 0 // Reset persuasion if needed
    };
  })
);
