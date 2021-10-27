import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="btn btn-primary col-md-12" [disabled]="disabled || loading" [type]="type" (click)="clickEvent.next()" >
      {{ text }}
      <span *ngIf="loading" class="float-right">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() text = '';
  @Input() type: 'submit' | 'button' = 'button';
  @Output() clickEvent = new EventEmitter<void>();
}
