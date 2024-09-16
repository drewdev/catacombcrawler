import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnemyState } from '../../state/reducers/enemy.reducer';
import { AsyncPipe } from '@angular/common';
import { PlayerState } from '../../state/reducers/player.reducer';

@Component({
  selector: 'app-enemy',
  standalone: true,
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss'],
  imports: [AsyncPipe]
})
export class EnemyComponent {
  enemy$: Observable<EnemyState>;
  player$: Observable<PlayerState>;

  constructor(private store: Store<{ enemy: EnemyState, player: PlayerState }>) {
    this.enemy$ = this.store.select('enemy');
    this.player$ = this.store.select('player');
  }
}
