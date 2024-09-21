import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { updatePlayerName } from '../../state/actions/player.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-transition',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule ],
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss'],
})
export class TransitionComponent {
  name = '';
  constructor(
    private store: Store<{}>,
    private router: Router
  ) {}

  startGame() {
    this.store.dispatch(updatePlayerName({ name: this.name }));
    this.router.navigate(['/game'], { skipLocationChange: true });
  }
}
