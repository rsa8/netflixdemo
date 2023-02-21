import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {HttpClientModule} from '@angular/common/http';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesGridComponent } from './pages/movies-grid/movies-grid.component';
import { MylistComponent } from './pages/mylist/mylist.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShowMovieComponent } from './pages/show-movie/show-movie.component';
import { AppRouterModule } from './app.router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth-guard.service';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { NgbModule, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from './services/notification.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MoviesComponent,
    MoviesGridComponent,
    MylistComponent,
    RegisterComponent,
    ShowMovieComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    YouTubePlayerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgbModalModule,
    IvyCarouselModule,
    CarouselModule,
  ],

  providers: [
    AuthGuard,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
