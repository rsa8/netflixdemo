import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Movies, MoviesDetails, Cast } from '../../services/interface/movies.interface';
import { MovieService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnDestroy {

  videoLink = 'https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1';
  data!: { movie: any; moviesDetails: any, cast: any; };
  player!: YT.Player;
  public id: string = 'yjRHZEUamCc?loop=1';
  apiLoaded = false;
  movie!: Movies;
  moviesDetails!: MoviesDetails;
  isFav = false;
  movieCast: Cast[] = []
  casts: any;
  playerConfig = {
    controls: 1,
    mute: 0,
    autoplay: 1
  };
  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
  public addFavoriteMovie(movie: any, cast: any, movieDetails: any) {
    console.log('yess');
    this.isFav = true;
    const movieData = {
      movie: movie,
      cast: cast,
      movieDetails: movieDetails
    }
    this.movieService.addFavorite(movieData)
    .subscribe(response => {
    })
  }
  ngOnInit() {
    if (!this.apiLoaded) {
      this.movie = this.data.movie;
      this.moviesDetails = this.data.moviesDetails;
      this.movieCast = this.data.cast.cast;
      this.casts = this.movieCast.slice(0, 5);
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  public showMovie(id: number, event: any) {
    if(event.target.nodeName == 'I') {
      return;
    }
    this.modalService.dismissAll();
    this.router.navigate([`/movie/${id}`]);
  }

  savePlayer(player: any) {
    this.player = player;
    //console.log('player instance', player);
  }
  onStateChange(event: any) {
   // console.log('player state', event.data);
  }
}
