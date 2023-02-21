import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { Cast, Movies, MoviesDetails } from 'src/app/services/interface/movies.interface';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})
export class ShowMovieComponent {
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
    autoplay: 1,
    playsinline: 0
  };
  constructor(public activatedRouter: ActivatedRoute, public movieService: MovieService) {
    // this.activatedRouter.params
    //   .pipe(mergeMap(params => this.movieService.getDetails(params['id'])))
    //   .subscribe(movie => {
    //       this.movie = movie;
    //   });
  }

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  savePlayer(player: any) {
    this.player = player;
   // console.log('player instance', player);
  }
  onStateChange(event: any) {
   // console.log('player state', event.data);
  }
}
