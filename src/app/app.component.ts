// src/app/app.component.ts
import { Component } from '@angular/core';

/**
 * The root component of the myFlix Angular application.
 * This component serves as the entry point to the app and typically contains
 * the layout, global styles, and other essential elements that are shared across the application.
 *
 * @component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}
