// src/app/movie-card/movie-genre.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This component displays the genre information of a movie.
 * It is intended to be used in a dialog, where the genre data is passed to the component through MAT_DIALOG_DATA.
 * 
 * @component
 */
@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrl: './movie-genre.component.scss',
  standalone: false,
})

export class MovieGenreComponent {
    /**
   * Constructs an instance of the MovieGenreComponent.
   * Injects the genre data from the parent component via MAT_DIALOG_DATA.
   * 
   * @param {Object} data - The data passed into the component from the parent, containing the movie genre information.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}

  /**
   * A getter method to access the genre data passed to the component.
   * 
   * @returns {any} - The genre data passed through MAT_DIALOG_DATA.
   */
  get genre() {
    return this.data.genre;
  }
}