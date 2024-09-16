import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transition',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss'],
})
export class TransitionComponent {
  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['/game'], { skipLocationChange: true });  // Te lleva al componente del juego
  }
}
