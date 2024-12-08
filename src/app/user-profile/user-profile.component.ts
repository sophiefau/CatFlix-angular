// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import components
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

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
      this.getfavoriteMovies();
    });
  }

  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favoriteMovies = res.filter((movie: any) => {
        return this.userData.FavoriteMovies.includes(movie._id)
      })
    }, (err: any) => {
      console.error(err);
    });
  }


// Edit profile
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
