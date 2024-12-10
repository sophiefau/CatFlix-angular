// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * This component handles the user login process.
 * It takes the user's credentials (username and password), sends them to the API for authentication,
 * and handles the response by storing user data in localStorage and navigating to the movies page.
 * 
 * @component
 */
@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrl: './user-login-form.component.scss',
    standalone: false,
})
export class UserLoginFormComponent implements OnInit {
   /**
   * The data for the user attempting to log in, including their username and password.
   * This data is bound to the form inputs.
   * 
   * @type {Object}
   */
    @Input() userData = { Username: "", Password: "" };

     /**
   * Constructs an instance of the UserLoginFormComponent.
   * 
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests, including user login.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Dialog reference to close the login form upon successful login.
   * @param {MatSnackBar} snackBar - Snackbar service to display notifications (success or failure) to the user.
   * @param {Router} router - Angular Router service to navigate to different views within the app.
   */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) { }
    
    ngOnInit(): void {}

     /**
   * Handles user login by sending the user's credentials to the API for authentication.
   * On successful login, the user data and token are stored in localStorage, and the user is redirected to the 'movies' page.
   * If the login fails, a failure message is displayed using Snackbar.
   * 
   * @returns {void}
   */
    loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe(
        (result) => {
          this.dialogRef.close();
          this.snackBar.open('Login successful', 'OK', {
            duration: 2000,
          });
          localStorage.setItem('currentUser', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          this.router.navigate(['movies']);
        },
  
        (result) => {
          this.snackBar.open(result, 'NOT OK', {
            duration: 2000,
          });
        }
      );
    }
  }