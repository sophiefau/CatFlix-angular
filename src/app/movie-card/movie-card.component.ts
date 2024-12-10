// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

// import components for movie details, cat details, and genre
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieCatComponent } from '../movie-cat/movie-cat.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * The MovieCardComponent displays a list of movies and allows users to view details,
 * add or remove movies from their favorites, and open dialogs for more information.
 *
 * @component
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false,
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  currentUser: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
  }

  /**
   * Fetches all movies from the backend API and stores them in the `movies` array.
   *
   * @returns {void}
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Fetches user data, including the list of favorite movies, and stores them.
   * This method is called during component initialization.
   *
   * @returns {void}
   */
  getUserData(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser(username).subscribe({
        next: (res: any) => {
          this.currentUser = res;
          this.favoriteMovies = res.FavoriteMovies; // Store favorite movie IDs
        },
        error: (err: any) => {
          console.error('Error fetching user data:', err);
        },
      });
    }
  }

  /**
   * Opens a dialog showing movie details.
   *
   * @param {any} movie - The movie whose details will be shown.
   * @returns {void}
   */
  openMovieDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { movie },
    });
  }

  /**
   * Opens a dialog showing the cat associated with a movie.
   *
   * @param {any} cat - The cat to be shown in the dialog.
   * @returns {void}
   */
  openCatDialog(cat: any): void {
    this.dialog.open(MovieCatComponent, {
      data: { cat },
    });
  }

  /**
   * Opens a dialog showing the genre of a movie.
   *
   * @param {any} genre - The genre to be shown in the dialog.
   * @returns {void}
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieGenreComponent, {
      data: { genre },
    });
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   * Refreshes the user data after the movie is added.
   *
   * @param {string} movieId - The ID of the movie to be added to favorites.
   * @returns {void}
   */
  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe({
      next: (res: any) => {
        console.log('Movie added to favorites:', res);
        this.getUserData(); // Refresh user data to update favorite movies
      },
      error: (err: any) => {
        console.error('Error adding movie to favorites:', err);
      },
    });
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * Refreshes the user data after the movie is removed.
   *
   * @param {string} movieId - The ID of the movie to be removed from favorites.
   * @returns {void}
   */
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
      next: (res: any) => {
        console.log('Movie removed from favorites:', res);
        this.getUserData(); // Refresh user data to update favorite movies
      },
      error: (err: any) => {
        console.error('Error removing movie from favorites:', err);
      },
    });
  }

  /**
   * Checks if a movie is in the user's list of favorite movies.
   *
   * @param {string} movieId - The ID of the movie to be checked.
   * @returns {boolean} - `true` if the movie is in the favorites list, `false` otherwise.
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Navigates to the user's profile page.
   *
   * @returns {void}
   */
  userProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs the user out by removing the user and token from local storage
   * and navigating to the welcome page.
   *
   * @returns {void}
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['welcome']);
  }
}
