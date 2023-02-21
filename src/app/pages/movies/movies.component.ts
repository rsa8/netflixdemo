import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/services/interface/movies.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movies[] = []
  movieSearchSub = new Subscription();
  constructor(
    private movieService: MovieService) {
  }

  ngOnInit() {

  }

  searchMovie(search: Event) {
    const name = (search.target as HTMLInputElement).value;
    this.movieService.search(name);
    this.movieSearchSub = this.movieService.searchListner()
    .subscribe((response: any) => {
      this.movies = response.movies;
      console.log(this.movies);
    })
  }
}
