import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://catflix-99a985e6fffa.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  
   // Get token from local storage
   private getToken(): string {
    return localStorage.getItem('token') || '';
  }

 // User registration
public userRegistration(userDetails: any): Observable<any> {
  return this.http.post(apiUrl + 'signup', userDetails).pipe(
    tap((response: any) => {
      // Save username to localStorage
      localStorage.setItem('user', userDetails.Username); 
    }),
    catchError(this.handleError)
  );
}

   // User login
public userLogin(userDetails: any): Observable<any> {
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    tap((response: any) => {
      // Save token and username to localStorage
      localStorage.setItem('token', response.token); 
      localStorage.setItem('user', response.user.Username); 
    }),
    catchError(this.handleError)
  );
}

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovie(movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

   // Get all cats
   public getAllCats() {
    const token = this.getToken();
    return this.http.get(apiUrl + 'cats/', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get one cat
  public getCat(name: string) {
    const token = this.getToken();
    return this.http.get(apiUrl + 'cats/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(name: string) {
    const token = this.getToken();
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a user
  public getUser(username: string) {
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError));
  }

 // Update user
 public updateUserProfile(username: string, userData: any) {
  const token = this.getToken();
  return this.http.patch(apiUrl + 'users/' + username, userData, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(catchError(this.handleError));
}

    // Add a movie to favorite Movies
    public addFavoriteMovie(movieId: string) {
      const token = this.getToken();
      const username = localStorage.getItem('user');

      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token
      });

       return this.http.post(apiUrl + 'users/' + username + '/' + movieId, {}, { headers }).pipe(
    catchError(this.handleError)
  );
    }
  
 // Delete a movie from favorite Movies
public deleteFavoriteMovie(movieId: string) {
  const token = this.getToken();
  const username = localStorage.getItem('user');

  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  });

  return this.http.delete(apiUrl + 'users/' + username + '/' + movieId, { headers }).pipe(
    catchError(this.handleError)
  );
}

  // Delete user
  public deleteUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}