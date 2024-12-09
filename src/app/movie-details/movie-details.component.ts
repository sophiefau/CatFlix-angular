// src/app/movie-card/movie-details.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  standalone: false, 
})
export class MovieDetailsComponent {
  movie: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: { movie: any }) {}

  get movieDetails() {
    return this.data.movie;
  }
}

