// src/app/movie-card/movie-cat.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This component displays the details of a cat associated with a movie.
 * It is intended to be used in a dialog, where the cat data is passed to the component through MAT_DIALOG_DATA.
 * 
 * @component
 */
@Component({
  selector: 'app-movie-cat',
  templateUrl: './movie-cat.component.html',
  styleUrl: './movie-cat.component.scss',
  standalone: false,
})

export class MovieCatComponent {
  /** The cat data passed into the component from the parent */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { cat: any }) {}

   /**
   * A getter method to access the cat details passed to the component.
   * 
   * @returns {any} - The cat details passed through MAT_DIALOG_DATA.
   */
  get cat() {
    return this.data.cat;
  }
}
