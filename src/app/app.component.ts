import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SearchComponent],
  template: `
    <app-navbar (themeChange)="onThemeChange($event)"></app-navbar>
    <div class="container">
      <h1>{{ currentTheme | titlecase }} Explorer</h1>
      <app-search [theme]="currentTheme" (searchEvent)="onSearch($event)"></app-search>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 60px auto 0;
      padding: 20px;
      font-family: 'Roboto', sans-serif;
      background-color: #f0f0f0;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      color: #3c5aa6;
      font-size: 3em;
      margin-bottom: 20px;
      text-shadow: 2px 2px #ffcb05;
    }
  `]
})
export class AppComponent {
  currentTheme: string = 'pokemon';
  searchTerm: string = '';

  onThemeChange(theme: string) {
    this.currentTheme = theme;
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }
}