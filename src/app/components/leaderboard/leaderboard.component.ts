import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../character.service';
import { resetPlayer } from '../../state/actions/player.actions';
import { resetEnemies } from '../../state/actions/enemy.actions';
import { Store } from '@ngrx/store';
import { EnemyState } from '../../state/reducers/enemy.reducer';
import { PlayerState } from '../../state/reducers/player.reducer';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent {
  players: any[] = [];
  constructor(
    private router: Router,
    private characterService: CharacterService,
    private store: Store<{ player: PlayerState; enemy: EnemyState }>
  ) {}

  ngOnInit() {
    this.characterService.getCharacters().subscribe((data) => {
      this.players = data.sort((a: any, b: any) => b.level - a.level);
    });
  }

  back() {
    this.store.dispatch(resetEnemies());
    this.store.dispatch(resetPlayer());
    this.router.navigate(['/']);
  }
}
