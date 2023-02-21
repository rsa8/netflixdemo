import { Component, OnInit } from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public url!: string;
  constructor(private router: Router) {
    this.router.events
      .subscribe((event: Event) => {
          if (event instanceof NavigationEnd ) {
              console.log(event.url);
              this.url = event.url;
          }
      });
  }

  ngOnInit() {
  }

}
