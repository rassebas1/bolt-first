import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <ul>
        <li *ngFor="let theme of themes">
          <a [routerLink]="['/list', theme]" (click)="changeTheme(theme)">{{ theme | titlecase }}</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    nav {
      background-color: #3c5aa6;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
    }
    li {
      margin: 0 10px;
    }
    a {
      color: #ffcb05;
      text-decoration: none;
      padding: 15px 10px;
      display: inline-block;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    a:hover {
      background-color: #2a3f7d;
    }
  `]
})
export class NavbarComponent {
  @Output() themeChange = new EventEmitter<string>();
  themes = ['pokemon', 'berries', 'contests', 'games'];

  changeTheme(theme: string) {
    this.themeChange.emit(theme);
  }
}