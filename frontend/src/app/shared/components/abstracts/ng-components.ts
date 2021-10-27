import { ChangeDetectorRef, Component, Injector, Input, Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({ template: '' })
export class AbstractNgModelComponent<T = any> implements ControlValueAccessor {
  @Input()
  cid?: string;

  @Input()
  name = '';

  @Input()
  disabled = false;

  @Input()
  set value(value: T) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): T {
    return this._value;
  }

  onChange!: (value: T | null) => void;
  onTouched!: () => void;

  // tslint:disable-next-line: variable-name
  protected _value!: T;
  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>);
  }

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value: any): void {
    this._value = value;
    // 因為ChangeDetectionStrategy設為OnPush，所以必須手動通知angular呼叫偵測
    // 註: OnPush 只有在元件的 @Input 變更，且真正有變更時(物件記憶體位置變動)，才會進行變更偵測。
    setTimeout(() => this.cdRef.detectChanges(), 0);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
