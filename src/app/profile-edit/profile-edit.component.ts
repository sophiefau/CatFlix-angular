// src/app/profile-edit/profile-edit.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * This component allows users to edit their profile information, including their username, email, birthday, and password.
 * It is displayed within a dialog, and the changes are saved by making an API request to update the user's profile.
 *
 * @component
 */
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  standalone: false,
})
export class ProfileEditComponent {
  /**
   * The form group used for the profile edit form, containing fields like Username, Email, Birthday, and Password.
   *
   * @type {FormGroup}
   */
  editForm: FormGroup;

  /**
   * Constructs an instance of the ProfileEditComponent.
   * Initializes the form with values from the provided user data.
   *
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests, including updating user profile.
   * @param {FormBuilder} fb - Angular FormBuilder service to create and manage the form group.
   * @param {MatDialogRef<ProfileEditComponent>} dialogRef - Dialog reference to close the profile edit form upon saving or canceling.
   * @param {Object} data - The user data passed into the component from the parent, injected via MAT_DIALOG_DATA.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userData: any }
  ) {
    this.editForm = this.fb.group({
      Username: [data.userData.Username, Validators.required],
      Email: [data.userData.Email, [Validators.required, Validators.email]],
      Birthday: [data.userData.Birthday],
      Password: [data.userData.Password],
    });
  }

  /**
   * Handles saving the updated profile data.
   * If the form is valid, it sends the updated user data to the API to update the profile.
   * On success, the dialog is closed, and a success message is displayed.
   *
   * @returns {void}
   */
  saveProfile(): void {
    if (this.editForm.valid) {
      console.log(localStorage.getItem('token'));
      const updatedUserData = this.editForm.value;
      const username = this.data.userData.Username;

      this.fetchApiData.updateUserProfile(username, updatedUserData).subscribe(
        (response) => {
          console.log(localStorage.getItem('token'));
          alert('Profile updated successfully!');
          this.dialogRef.close(true); // Close dialog and pass success
          localStorage.setItem('user', username); // Update localStorage if username changes
        },
        (error) => {
          console.error(error);
          alert('Failed to update profile. Please try again.');
        }
      );
    }
  }

  /**
   * Closes the profile edit dialog without saving any changes.
   *
   * @returns {void}
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
