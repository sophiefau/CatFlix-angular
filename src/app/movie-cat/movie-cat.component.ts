// src/app/movie-card/movie-cat.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-cat',
  templateUrl: './movie-cat.component.html',
  styleUrl: './movie-cat.component.scss',
  standalone: false,
})

export class MovieCatComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { cat: any }) {}

  get cat() {
    return this.data.cat;
  }
}
