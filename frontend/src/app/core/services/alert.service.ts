import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { assign } from 'src/app/utils';

enum AlertType {
  INFO = 'info',
  ERROR = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export interface Alert extends AlertOption {
  type: AlertType;
  message: string;
}

export interface AlertOption {
  timeout?: number;
  extraText?: string;
  onClose?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private static DEFAULT_OPTIONS: AlertOption = { timeout: 3000 };
  constructor() { }

  private alert$ = new Subject<Alert>();

  alertSuccess(message: string, options?: AlertOption): void {
    this.alert(AlertType.SUCCESS, message, options);
  }

  alertError(message: string, options?: AlertOption): void {
    this.alert(AlertType.ERROR, message, options);
  }

  alertWarning(message: string, options?: AlertOption): void {
    this.alert(AlertType.WARNING, message, options);
  }

  alertInfo(message: string, options?: AlertOption): void {
    this.alert(AlertType.INFO, message, options);
  }

  private alert(type: AlertType, message: string, options: AlertOption = {}): void {
    const alert: Alert = { type, message, ...assign(options, AlertService.DEFAULT_OPTIONS) };
    this.alert$.next(alert);
  }

  asObservable(): Observable<Alert> {
    return this.alert$.asObservable();
  }
}
