import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
        placeholder="Search Pokémon..."
      >
    </div>
  `,
  styles: [`
    .search-container {
      margin-bottom: 20px;
    }
    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #3c5aa6;
      border-radius: 5px;
    }
  `]
})
export class PokemonSearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.searchEvent.emit(this.searchTerm);
  }
}