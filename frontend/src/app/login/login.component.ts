import { assign } from 'src/app/utils';
import { HttpService } from './../core/services/http.service';
import { AlertService } from './../core/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../core/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = {
    uid: '',
    password: '',
    auxpassword: '',
    validateid: -1,
  };

  public showCaptcha = false;
  public captchaUrl = '';
  public loading = false;

  constructor(
    private alertService: AlertService,
    private httpService: HttpService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void { }

  submit(): void {
    const req = { ...this.user };
    this.loading = true;
    this.httpService
      .post<User>('/user/login', req, {
        cache: false,
        ignoreCheck: true,
        // ignoreErrorCheck: true
      })
      .subscribe((res) => {
        this.loading = false;
        const { code, message, data } = res;
        this.showCaptcha = false;
        if (code === 0) {
          this.userService.setUser(data);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.alertService.alertError(message, { extraText: `${code}` });
        }
      }, (err: HttpErrorResponse) => {
        this.loading = false;
      });
  }

}
