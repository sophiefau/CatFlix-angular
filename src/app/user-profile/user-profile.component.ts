// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})

export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser(): void {
    const username = localStorage.getItem('user')!;  
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.userData = resp;
      console.log(this.userData);
    });
  }

        // Navigation
        movieCard(): void {
          this.router.navigate(['movies']);
        }
      
        logout(): void {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['welcome']);
        }
      
}
