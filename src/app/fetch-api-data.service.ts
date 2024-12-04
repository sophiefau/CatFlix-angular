import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'signup', userDetails).pipe(
    catchError(this.handleError)
    );
  }

    // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
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
    return this.http.get(apiUrl + 'genres' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get all users
  public getAllUsers() {
    const token = this.getToken();
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

    // Add a movie to favorite Movies
    public addUserFavoriteMovie(username: string, movieId: string) {
      const token = this.getToken();
      return this.http.post(apiUrl + 'users/' + username + movieId, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        catchError(this.handleError)
      );
    }
  
 // Delete a movie from favorite Movies
 public deleteUserFavoriteMovie(username: string, movieId: string) {
  const token = this.getToken();
  return this.http.delete(apiUrl + 'users/' + username + movieId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    catchError(this.handleError)
  );
}

 // Edit user
 public editUser(username: string): Observable<any> {
  const token = this.getToken();
  return this.http.patch(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      })
  }).pipe(
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