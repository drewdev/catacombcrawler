import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-box',
  standalone: true,
  templateUrl: 'text-box.component.html',
  styleUrls: ['text-box.component.scss'],
  imports: [ CommonModule ]
})
export class TextBoxComponent implements OnInit, OnChanges  {
  @Input() text: string = '';
  displayedText: string = '';
  private currentCharIndex: number = 0;
  critical = false;
  failure = false;

  ngOnInit(): void {
    this.typeText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.critical = false;
    this.failure = false;
    if (changes['text']) {
      /(Critical|joke|fatal)/.test(this.text) ? this.critical = true : this.critical = false;
      /(fatal|devastating|missed|dead)/.test(this.text) ? this.failure = true : this.failure = false;
      this.displayedText = '';
      this.currentCharIndex = 0;
      this.typeText();
    }
  }

  typeText(): void {
    const typingSpeed = 20;
    if (this.currentCharIndex < this.text.length) {
      this.displayedText += this.text.charAt(this.currentCharIndex);
      this.currentCharIndex++;
      setTimeout(() => this.typeText(), typingSpeed);
    }
  }
}
