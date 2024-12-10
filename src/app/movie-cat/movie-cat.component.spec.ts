// src/app/movie-cat/movie-cat.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCatComponent } from './movie-cat.component';

describe('MovieCatComponent', () => {
  let component: MovieCatComponent;
  let fixture: ComponentFixture<MovieCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
