import { Component } from '@angular/core';
import { Event,  Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public url!: string;
  public currentUser: any;

  isAuthenticated = false;
  userId?: string;

  constructor(public router: Router, public authService: AuthService) {
      this.router.events
        .subscribe((event: Event) => {
          if (event instanceof NavigationEnd ) {

              this.url = event.url;
          }
      });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.userId = this.authService.getUserID();
  }

  public logout() {
    this.authService.logout();
  }

  public setProfile(profile: any, index: number) {
      profile.indexImg = index;
      this.currentUser.profileSelected = profile;
      this.authService.setCurrentUser(this.currentUser);
  }

  public validateShowHeader() {
      return this.url
          && this.url !== '/login'
          && this.url !== '/profiles'
          && this.url !== '/register'
          && !this.url.includes('/movie/');
  }
}
