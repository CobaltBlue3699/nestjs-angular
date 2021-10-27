import { HttpService } from './../../core/services/http.service';
import { UserService, User } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User | null;

  constructor(private userService: UserService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.userService.logout();
  }

}
