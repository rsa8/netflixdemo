import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { apilinks } from '../services/interface/api-links.interface';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any;
  private currentUserObservable: BehaviorSubject<any>;
  private isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  private tokenExpirationTimer: any;
  private authToken = '';
  private tokenTimer: any = '';
  private userID = '';


  constructor(
    public http: HttpClient,
    public router: Router,
    private notificationService: NotificationService) {
      if (localStorage.getItem('currentUser') != null) {
          this.currentUser =  localStorage.getItem('currentUser');
      }
      this.currentUserObservable = new BehaviorSubject(this.currentUser);
  }
  public login(userLogin: any) {
    this.http.post<{
        user: string; token: string, expiresIn: number, message: string, status: number
    }>(environment.apiMongo + apilinks.login, userLogin)
    .subscribe((response) => {
        console.log(response);
        const token = response.token;

        if (token) {
          this.notificationService.success(response.message);
          this.authToken = token;
          this.isAuthenticated = true;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.userID = response.user;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 10000000 );
        //   console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userID);
          this.authStatusListner.next(true);
          this.router.navigate(['/']);
        } else {
          this.notificationService.error(response.message);
        }
    })
  }

  public register(user: any) {
      const url = environment.apiMongo + apilinks.signup;
      this.http.post<{ message: string, status: number, user: string }>(url, user)
      .subscribe((userLogged) => {
        console.log(userLogged);
        if (userLogged.status === 1) {
          this.notificationService.success(userLogged.message);
          this.router.navigate(['/login']);
        } else {
          this.notificationService.error(userLogged.message);
        }
      })
  }

  public logout() {
    this.authToken = '';
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
    clearTimeout(this.tokenTimer);
    this.authStatusListner.next(false);
    this.router.navigate(['/login']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }


  public getCurrentUser(): Observable<any> {
      return this.currentUserObservable;
  }

  public setCurrentUser(user: any): void {
      localStorage.setItem('currentUser', JSON.stringify(user));
      //this.currentUser = user;
      this.currentUserObservable.next(user);
  }

  getUserID(): string {
    return this.userID;
  }
  getToken(): string {
      return this.authToken;
  }
  getAuthListner(): any {
      return this.authStatusListner.asObservable();
  }
  autoLogout(expirationDuration: number) {
      console.log(expirationDuration);
      this.tokenExpirationTimer = setTimeout(() => {
          this.logout();
          }, expirationDuration);
    // console.log(this.tokenExpirationTimer);
  }
  setAuthTimer(duration: number): any {
    this.tokenTimer = setTimeout(() => {
        this.logout();
    }, duration * 1000);
  }
  autoAuthorization(): any {
      const authData = this.getAuthData();
      if (!authData) {
          return;
      }
      const now = new Date();

      const expiresIn = authData.expiration.getTime() - now.getTime();
      if (expiresIn > 0) {
          this.authToken = authData.token;
          this.isAuthenticated = true;
          this.userID = authData.userID;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatusListner.next(true);
          // this.router.navigate(['/admin']);
      }
  }
  private saveAuthData(token: string, expiresIn: Date, userID: string): any{
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresIn.toISOString());
    localStorage.setItem('userID', userID );
  }
  private getAuthData(): any {
      const tokens = localStorage.getItem('token');
      const expiration = localStorage.getItem('expiration');
      const userID = localStorage.getItem('userID');
      if (!tokens || !expiration ) {
          return;
      }
      return {
          token: tokens,
          expiration: new Date(expiration),
          userID
      };
  }
  systemInfo(): void {
    this.http.get(environment.apiMongo + apilinks.getSystemInfo).
    subscribe(response => {
      // console.log(response);
    })
  }
}
