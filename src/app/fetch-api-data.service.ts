// src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://catflix-99a985e6fffa.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})

/**
 * Service to handle API calls for user, movie, and cat-related data.
 * This service uses HttpClient to communicate with the backend API and
 * provides various methods for user registration, login, movie fetching, etc.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Constructor to inject HttpClient.
   * @param {HttpClient} http - The HttpClient service used for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the authentication token from localStorage.
   * @returns {string} - The token stored in localStorage or an empty string if not found.
   */
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * Registers a new user.
   * @param {any} userDetails - The user registration details (e.g., username, password).
   * @returns {Observable<any>} - The observable that emits the HTTP response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'signup', userDetails).pipe(
      tap((response: any) => {
        // Save username to localStorage
        localStorage.setItem('user', userDetails.Username);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Logs in an existing user.
   * @param {any} userDetails - The login details (e.g., username, password).
   * @returns {Observable<any>} - The observable that emits the HTTP response.
   */
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

  /**
   * Fetches all movies from the API.
   * @returns {Observable<any>} - The observable that emits the list of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details of a specific movie by its ID.
   * @param {string} movieId - The ID of the movie.
   * @returns {Observable<any>} - The observable that emits the movie details.
   */
  public getMovie(movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches all cats from the API.
   * @returns {Observable<any>} - The observable that emits the list of cats.
   */
  public getAllCats() {
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'cats/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details of a specific cat by its name.
   * @param {string} name - The name of the cat.
   * @returns {Observable<any>} - The observable that emits the cat details.
   */
  public getCat(name: string) {
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'cats/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details of a specific genre by its name.
   * @param {string} name - The name of the genre.
   * @returns {Observable<any>} - The observable that emits the genre details.
   */
  public getGenre(name: string) {
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'genres/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches user details by username.
   * @param {string} username - The username of the user.
   * @returns {Observable<any>} - The observable that emits the user details.
   */
  public getUser(username: string) {
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates the user profile.
   * @param {string} username - The username of the user to update.
   * @param {any} userData - The updated user data.
   * @returns {Observable<any>} - The observable that emits the HTTP response.
   */
  public updateUserProfile(username: string, userData: any) {
    const token = this.getToken();
    return this.http
      .patch(apiUrl + 'users/' + username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's favorite movies.
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {Observable<any>} - The observable that emits the HTTP response.
   */
  public addFavoriteMovie(movieId: string) {
    const token = this.getToken();
    const username = localStorage.getItem('user');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .post(apiUrl + 'users/' + username + '/' + movieId, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a movie from the user's favorite movies.
   * @param {string} movieId - The ID of the movie to remove from favorites.
   * @returns {Observable<any>} - The observable that emits the HTTP response.
   */
  public deleteFavoriteMovie(movieId: string) {
    const token = this.getToken();
    const username = localStorage.getItem('user');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .delete(apiUrl + 'users/' + username + '/' + movieId, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user account.
   * @param {string} username - The username of the user to delete.
   * @returns {Observable<any>} - The observable that emits the HTTP response.
   */
  public deleteUser(username: string): Observable<any> {
    const token = this.getToken();
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors by logging them and returning an observable error.
   * @param {HttpErrorResponse} error - The error response from the HTTP request.
   * @returns {Observable<never>} - The observable that emits an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
