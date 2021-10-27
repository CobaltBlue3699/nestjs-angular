import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInputTextComponent } from './abstracts/input-text.components';

@Component({
  selector: 'app-input-text',
  template: `
  <div class="input-group mb-3">
    <input class="form-control"
           [id]="cid"
           [name]="name"
           [type]="type"
           [placeholder]="placeholder"
           [readonly]="inputReadonly"
           [required]="inputRequired"
           (blur)="blurEvent.next()"
           (focus)="focusEvent.next()"
           [(ngModel)]="value">
  </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent extends AbstractInputTextComponent {

}

@Component({
  selector: 'app-input-text-with-label',
  template: `
  <div class="form-label-group mb-3">
    <label [attr.for]="cid">{{ label + asterix }}</label>
    <input class="form-control"
           [id]="cid"
           [name]="name"
           [type]="type"
           [placeholder]="placeholder"
           [readonly]="inputReadonly"
           [required]="inputRequired"
           (blur)="blurEvent.next()"
           (focus)="focusEvent.next()"
           [(ngModel)]="value">
  </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextWithLabelComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextWithLabelComponent extends AbstractInputTextComponent {
  @Input()
  label = '';

  get asterix(): string {
    return this.inputRequired ? ' *' : '';
  }
}

@Component({
  selector: 'app-input-password',
  template: `
  <div class="input-group mb-3">
    <input class="form-control"
           [id]="cid"
           [name]="name"
           [type]="type"
           [placeholder]="placeholder"
           [readonly]="inputReadonly"
           [required]="inputRequired"
           (blur)="blurEvent.next()"
           (focus)="focusEvent.next()"
           [(ngModel)]="value">
    <div class="input-group-addon">
      <span class="input-group-text" style="height: 38px;" (click)="type = type === 'password' ? 'text' : 'password'">
          <i class="fa" [ngClass]="{ 'fa-eye-slash': type === 'text', 'fa-eye': type === 'password' }" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponent extends AbstractInputTextComponent {
  type = 'password'
}
