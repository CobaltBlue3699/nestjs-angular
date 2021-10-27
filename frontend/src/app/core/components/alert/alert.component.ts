import { Alert, AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.asObservable().subscribe(alert => {
      this.alerts = [...this.alerts, alert];
      if (alert.timeout != -1) {
        timer(alert.timeout).subscribe(() => {
          this.close(alert)
        });
      }
    })
  }

  close(alert: Alert) {
    this.alerts = this.alerts.filter(tmpAlert => alert !== tmpAlert);
    if (alert.onClose) {
      alert.onClose();
    }
  }

}
