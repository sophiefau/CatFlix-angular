// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * This component provides a user registration form where users can input their data
 * (Username, Password, Email, Birthday) to register an account in the application.
 * It interacts with the FetchApiDataService to handle user registration via an API call.
 *
 * @component
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: false,
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The user data object that is used to bind input fields in the form (Username, Password, Email, Birthday).
   * This data is passed from the parent component and is submitted when registering a user.
   *
   * @example { Username: 'exampleUser', Password: 'examplePassword', Email: 'example@example.com', Birthday: '2000-01-01' }
   * @type {object}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs an instance of the UserRegistrationFormComponent.
   *
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests, including user registration.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to control the dialog's lifecycle (open/close).
   * @param {MatSnackBar} snackBar - The Angular Material SnackBar service to show temporary messages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Registers the user by calling the userRegistration method from FetchApiDataService.
   * Upon success, it closes the registration dialog and shows a success message via SnackBar.
   * If an error occurs, it displays the error message using SnackBar.
   *
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
