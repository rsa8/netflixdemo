import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {first, map, switchMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';
import { apilinks } from './interface/api-links.interface';
import { Movies, MoviesDetails, Cast } from './interface/movies.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(public http: HttpClient, public authService: AuthService) { }

  movies: Movies[] = [];
  movieDetails!: MoviesDetails;
  movieCast!: any;
  moviesSearch: Movies[] = [];
  polularMovies: Movies[] = [];

  moviesSubject = new Subject<{ movies: Movies[]} >();
  popularMoviesSubject = new Subject<{ movies: Movies[]} >();
  moviesSearchSubject = new Subject<{ movies: Movies[]} >();
  moviesDetailsSubject = new Subject<{ moviesDetails: MoviesDetails, cast: Cast} >();

   getFavourite() {
    const query = `?email=${'rahul'}`;
    this.http.get(environment.apiMongo+apilinks.getFavourite+query)
    .subscribe((response: any) => {
      //¯console.log(response);
      this.movies = response.movie;
    })
   }

  public addFavorite(movie: any) {
    const url =  environment.apiMongo + apilinks.addFavourite;
    return this.http.post(url, {profile: "rahul", movie: movie});
  }

  public getDetails(id: number) {
    const query = `?id=${id}`;
    const url =  environment.apiMongo + apilinks.getDetails + query;
    this.http.get(url)
    .subscribe((response: any) => {
      this.movieDetails = response.movies.data;
      this.movieCast = response.cast.data;
      this.moviesDetailsSubject.next({ moviesDetails: this.movieDetails, cast: this.movieCast });
    })
  }
  public getDetailsListner(): any {
    return this.moviesDetailsSubject.asObservable();
  }

  public getPopular(page: number) {
    const url = `?page=${page}`;
    this.http.get(environment.apiMongo+apilinks.getPopular+url)
    .subscribe((response: any) => {
      this.polularMovies = response.movies.data.results;
      this.popularMoviesSubject.next({movies: this.polularMovies});
    })
  }
  public getPopularListner(): any {
    return this.popularMoviesSubject.asObservable();
  }
  public getTrending(page: number) {
    const url = `?page=${page}`;
    this.http.get(environment.apiMongo+apilinks.getTrending+url)
    .subscribe((response: any) => {
      this.movies = response.movies.data.results;
      this.moviesSubject.next({movies: this.movies});
    })
  }
  public getTrendingListner(): any {
    return this.moviesSubject.asObservable();
  }

  public search(search: string): any {
    const url = `?name=${search}`;
    this.http.get(environment.apiMongo + apilinks.getSearch+url)
    .subscribe((response: any) => {
      this.moviesSearch = response.movies.data.results;
      this.moviesSearchSubject.next({movies: this.moviesSearch});
    })
  }
  public searchListner(): any {
    return this.moviesSearchSubject.asObservable();
  }
}
