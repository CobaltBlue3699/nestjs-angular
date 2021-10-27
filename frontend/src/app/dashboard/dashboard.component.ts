import { Browser } from 'src/app/utils';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  get Browser() {
    return Browser;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
