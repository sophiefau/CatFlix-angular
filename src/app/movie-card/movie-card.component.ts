// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';


// import components
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieCatComponent } from '../movie-cat/movie-cat.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false,
})
export class MovieCardComponent {
  movies: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  // Open the dialogs
  openMovieDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { movie }
    });
  }

  openCatDialog(cat: any): void {
    this.dialog.open(MovieCatComponent, {
      data: { cat }
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieGenreComponent, {
      data: { genre }
    });
  }

  // Add movie to favorites
  addToFavorites(movieId: string): void {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: (res: any) => {
          console.log('Movie added to favorites:', res);
        },
        error: (err: any) => {
          console.error('Error adding movie to favorites:', err);
        }
      });
  }

    // Navigation
    userProfile(): void {
      this.router.navigate(['profile']);
  }

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['welcome']);
}
}
