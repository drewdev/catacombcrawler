import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reward-modal',
  standalone: true,
  templateUrl: './reward-modal.component.html',
  styleUrls: ['./reward-modal.component.scss'],
})
export class RewardModalComponent {
  reward = {
    name: 'skeleton sword'
  }
  @Output() onRewardSelection = new EventEmitter<boolean>();

  selectReward(equip: boolean) {
    this.onRewardSelection.emit(equip);
  }
}
