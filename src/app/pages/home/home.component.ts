import { AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';
import { HostListener } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { Movies } from 'src/app/services/interface/movies.interface';
import { MovieService } from 'src/app/services/movies.service';
import { environment } from '../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked, AfterViewInit {
 // public movies: Observable<any>;
  nos = 1;
  movies: Movies[] = [];
  moviesSub = new Subscription();
  banner: Movies[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private movieService: MovieService) {
   // this.movies = this.movieService.findAllMovies();
  }
  ngAfterViewInit(): void {
   // console.log('lsat');

  }
  ngAfterViewChecked(): void {

  }
  imagePath = environment.imagePathOriginal;



  ngOnInit() {
    this.movieService.getPopular(1);
    this.moviesSub = this.movieService.getPopularListner()
    .subscribe((response: any) => {
      this.movies = response.movies;
      this.banner = response.movies.slice(0,5);
      setTimeout(()=> {

      }, 10000);

    })
  }



}
