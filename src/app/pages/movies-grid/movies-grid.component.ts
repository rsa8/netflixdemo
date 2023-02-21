import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';
import { Cast, Movies } from 'src/app/services/interface/movies.interface';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public moviesSearch!: Movies[];
  @Input() public isSearch!: boolean;
  @Input() public myList!: boolean;

  public movies: Movies[] = [];
  public popularMovies: Movies[] = [];
  public moviesTrending: Movies[] = [];
  moviesDetails!: Movies;
  movieCast!: Cast;
  moviesSub = new Subscription();
  popularSub = new Subscription();
  movieDetailsSub = new Subscription();
  imagePath = environment.imagePathW500;
  nos=6;

  constructor(
    public movieService: MovieService,
    private sanitization: DomSanitizer,
    private modalService: NgbModal,
    public router: Router) {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  ngOnDestroy(): void {
    this.moviesSub.unsubscribe();
    this.popularSub.unsubscribe();
    this.movieDetailsSub.unsubscribe();
  }

  ngOnInit() {
    this.getTrending();
    this.getPopular();
  }

  getPopular() {
    this.movieService.getPopular(1);
    this.moviesSub = this.movieService.getPopularListner()
    .subscribe((result: any) => {
      this.popularMovies =  result.movies;
    })
  }
  getTrending() {
    this.movieService.getTrending(1);
    this.moviesSub = this.movieService.getTrendingListner()
    .subscribe((result: any) => {
      this.moviesTrending =  result.movies;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.movies = this.moviesSearch;
  }

  openModal(movie: any): void {
   // const t = this.movies.find(th => th.id === movie);
    this.movieService.getDetails(movie.id);
    this.movieDetailsSub = this.movieService.getDetailsListner()
    .subscribe((response: any) => {
      this.moviesDetails = response.moviesDetails;
      this.movieCast = response.cast;
      const size = 'lg';
      const moviesDetails = this.modalService.open(MovieDetailsComponent, { size });
      moviesDetails.componentInstance.data = { movie: movie, moviesDetails: this.moviesDetails, cast: this.movieCast };
    })
  }

  public addFavoriteMovie(movie: any) {

  }

  public showMovie(id: number, event: any) {
    if(event.target.nodeName == 'I') {
      return;
    }
    this.router.navigate([`/movie/${id}`]);
  }

  public clearImgUrl(poster_path: string) {
    const image = environment.imagePathW500+poster_path;
    return this.sanitization.bypassSecurityTrustStyle(`url(${image})`);
  }

  slickInit(e: any) {
   // console.log('slick initialized');
  }

  breakpoint(e: any) {
   // console.log('breakpoint');
  }

  afterChange(e: any) {
   // console.log('afterChange');
  }

  beforeChange(e: any) {
   // console.log('beforeChange');
  }
}

