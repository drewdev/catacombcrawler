import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../character.service';

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
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    this.characterService.getCharacters().subscribe((data) => {
      this.players = data.sort((a: any, b: any) => b.level - a.level);
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
