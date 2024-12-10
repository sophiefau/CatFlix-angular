// src/app/welcome-page/welcome-page.component.ts
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The welcome page component displayed when a user visits the application.
 * It provides dialog options for user login and registration.
 *
 * @component
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: false,
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Opens a dialog for user registration.
   * The dialog uses the UserRegistrationFormComponent as its content and sets a fixed width for the dialog box.
   *
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens a dialog for user login.
   * The dialog uses the UserLoginFormComponent as its content and sets a fixed width for the dialog box.
   *
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
