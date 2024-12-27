import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, CommonModule],
  template: `
  <div *ngIf="visible" [ngClass]="'message ' + type">
    {{ message }}
  </div>
  `,
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 3000;
  visible: boolean = false;

  show(): void {
    this.visible = true;
    setTimeout(() => this.visible = false, this.duration);
  }
}
