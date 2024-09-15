import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnemyState } from '../../state/reducers/enemy.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-enemy',
  standalone: true,
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss'],
  imports: [AsyncPipe]
})
export class EnemyComponent {
  enemy$: Observable<EnemyState>;

  constructor(private store: Store<{ enemy: EnemyState }>) {
    this.enemy$ = this.store.select('enemy');
  }
}
