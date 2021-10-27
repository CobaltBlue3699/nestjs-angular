import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { assign } from 'src/app/utils';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  avatarUrl: string;
  nickname: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private httpService: HttpService, private router: Router) {
    this.user$.next(JSON.parse(localStorage.getItem('user') || 'null'));
    this.user$.subscribe(user => localStorage.setItem('user', JSON.stringify(user)));
  }

  logout(): void {
    this.httpService.post('/user/logout').subscribe(res => {
      this.user$.next(null);
      this.router.navigateByUrl('/login');
    });
  }

  setUser(user: User): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

}
