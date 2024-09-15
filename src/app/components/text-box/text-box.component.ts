import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-box',
  standalone: true,
  templateUrl: 'text-box.component.html',
  styleUrls: ['text-box.component.scss']
})
export class TextBoxComponent implements OnInit, OnChanges  {
  @Input() text: string = '';
  displayedText: string = '';
  private currentCharIndex: number = 0;

  ngOnInit(): void {
    this.typeText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      // Reiniciar la animación de escritura cuando cambia el mensaje
      this.displayedText = '';
      this.currentCharIndex = 0;
      this.typeText();
    }
  }

  typeText(): void {
    const typingSpeed = 30;
    if (this.currentCharIndex < this.text.length) {
      this.displayedText += this.text.charAt(this.currentCharIndex);
      this.currentCharIndex++;
      setTimeout(() => this.typeText(), typingSpeed);
    }
  }
}
