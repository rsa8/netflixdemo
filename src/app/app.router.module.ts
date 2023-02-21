import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MoviesComponent } from "./pages/movies/movies.component";
import { MylistComponent } from "./pages/mylist/mylist.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ShowMovieComponent } from "./pages/show-movie/show-movie.component";
import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]  },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]  },
  { path: 'movies', component: MoviesComponent,canActivate:[AuthGuard] },
  { path: 'movie/:id', component: ShowMovieComponent, canActivate:[AuthGuard]  },
  { path: 'list', component: MylistComponent, canActivate:[AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
