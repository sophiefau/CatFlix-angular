// src/app/profile-edit/profile-edit.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  standalone: false,
})

export class ProfileEditComponent implements OnInit {
  editedUser: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any }, 
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.user) {
      this.editedUser = { ...this.data.user };
    }
  }

  saveChanges(): void {
    console.log('Edited user data:', this.editedUser);

    this.fetchApiData.updateUserProfile(this.editedUser.username, this.editedUser).subscribe(
      (response: any) => {
        console.log('Profile updated successfully:', response);
        this.dialogRef.close(this.editedUser);
      },
      (error: any) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}