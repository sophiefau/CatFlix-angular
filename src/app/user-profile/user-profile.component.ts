// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import component to edit the profile
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

/**
 * This component displays the user's profile, including personal information and a list of favorite movies.
 * It allows the user to view and edit their profile, as well as navigate through the app or log out.
 *
 * @component
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {
  /**
   * The data for the current user, including personal information such as username, email, and birthday.
   * This data is populated after calling the API to fetch the user's details.
   *
   * @type {any}
   */
  userData: any = {};
  /**
   * A list of favorite movies for the current user. This is populated by fetching all movies and filtering them
   * based on the user's favorite movies list stored in their profile.
   *
   * @type {Array<any>}
   */
  favoriteMovies: any[] = [];

  /**
   * Constructs an instance of the UserProfileComponent.
   *
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests, including fetching user data and movies.
   * @param {Router} router - Angular Router service to navigate between different views in the app.
   * @param {MatDialog} dialog - Angular Material Dialog service to open dialogs, such as the profile edit dialog.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the current user's data from the API using the username stored in localStorage.
   * After fetching the user data, it calls getfavoriteMovies() to retrieve the user's favorite movies.
   *
   * @returns {void}
   */
  getUser(): void {
    const username = localStorage.getItem('user')!;
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.userData = resp;
      this.getfavoriteMovies();
    });
  }

  /**
   * Fetches all available movies and filters them to find the ones that are in the user's favorite movie list.
   * The filtered movies are stored in the favoriteMovies array.
   *
   * @returns {void}
   */
  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.favoriteMovies = res.filter((movie: any) => {
          return this.userData.FavoriteMovies.includes(movie._id);
        });
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  /**
   * Opens a dialog allowing the user to edit their profile. The user's current data is passed to the dialog component.
   * After the dialog is closed, the user's data is refreshed if any changes were made.
   *
   * @returns {void}
   */
  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: { userData: this.userData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUser();
      }
    });
  }

  /**
   * Navigates to the 'movies' page when the user clicks on the movie card.
   *
   * @returns {void}
   */
  movieCard(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logs the user out by removing the token and username from localStorage and navigating to the 'welcome' page.
   *
   * @returns {void}
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['welcome']);
  }
}
