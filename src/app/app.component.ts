import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { startGame, attackEnemy } from './state/actions/game.actions';
import { GameState } from './state/reducers/game.reducer';
import { CharacterService } from './character.service';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  characters: any[] = [];
  constructor(
    private store: Store<{ gameState: GameState }>,
    private characterService: CharacterService,
    private http: HttpClient
  ) {}

  createCharacter() {
    const character = {
      name: 'Gandalf',
      level: 15,
      stats: {
        strength: 1,
        agility: 1,
        intelligence: 3
      },
      inventory: {
        weapon: {
          attack: 1,
          name: 'wand'
        },
        armour: {
          defense: 1,
          name: 'cloak'
        }
      }
    };
  
    /*
    this.http.post('http://localhost:3000/characters', character)
      .subscribe(response => {
        console.log('Character created:', response);
      });
    */
  }

  startGame() {
    this.store.dispatch(startGame());
  }

  attackEnemy() {
    this.store.dispatch(attackEnemy({ damage: 10 }));
  }

  ngOnInit() {
    /*
    this.createCharacter();
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
    });
    */
  }
}
