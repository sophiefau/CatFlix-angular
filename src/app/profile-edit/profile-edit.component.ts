// src/app/profile-edit/profile-edit.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  standalone: false,
})

export class ProfileEditComponent {
  editForm: FormGroup;

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

  cancel(): void {
    this.dialogRef.close();
  }
}