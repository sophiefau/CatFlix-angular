// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrl: './user-login-form.component.scss',
    standalone: false,
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) { }
    
    ngOnInit(): void {}

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