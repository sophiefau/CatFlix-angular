// src/app/movie-card/movie-genre.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrl: './movie-genre.component.scss',
  standalone: false,
})

export class MovieGenreComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}

  get genre() {
    return this.data.genre;
  }
}