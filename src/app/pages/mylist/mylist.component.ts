import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/services/interface/movies.interface';
import { MovieService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {

  movies: Movies[] = [];
  moviesSub = new Subscription();
  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getFavourite();

  }

}
