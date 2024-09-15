import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlayerState } from '../../state/reducers/player.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  imports: [AsyncPipe]
})
export class PlayerComponent {
  player$: Observable<PlayerState>;

  constructor(private store: Store<{ player: PlayerState }>) {
    this.player$ = this.store.select('player');
  }
}
