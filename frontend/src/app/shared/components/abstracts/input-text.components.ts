import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractNgModelComponent } from './ng-components';

@Component({ template: '' })
export class AbstractInputTextComponent extends AbstractNgModelComponent<string> {

  @Input()
  readonly = false;

  @Input()
  required = false;

  @Input()
  placeholder = '';

  type = 'text';

  @Output()
  blurEvent = new EventEmitter<void>();

  @Output()
  focusEvent = new EventEmitter<void>();

  get inputReadonly(): boolean {
    return this.readonly || typeof this.readonly !== 'boolean';
  }

  get inputRequired(): boolean {
    return this.required || typeof this.required !== 'boolean';
  }
}
