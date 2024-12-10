// src/app/movie-card/movie-details.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This component displays the detailed information of a movie.
 * It is intended to be used in a dialog, where the movie data is passed to the component through MAT_DIALOG_DATA.
 *
 * @component
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  standalone: false,
})
export class MovieDetailsComponent {
  /** The movie data passed into the component from the parent */
  movie: any = {};

  /**
   * Constructs an instance of the MovieDetailsComponent.
   * Injects the movie data from the parent component via MAT_DIALOG_DATA.
   *
   * @param {Object} data - The data passed into the component from the parent, containing the movie details.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { movie: any }) {}

  /**
   * A getter method to access the movie details passed to the component.
   *
   * @returns {any} - The movie details passed through MAT_DIALOG_DATA.
   */
  get movieDetails() {
    return this.data.movie;
  }
}
