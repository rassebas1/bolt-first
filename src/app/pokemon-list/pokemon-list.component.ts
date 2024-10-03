import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  template: `
    <div class="pokemon-grid">
      <app-pokemon-card *ngFor="let pokemon of filteredPokemon" [pokemon]="pokemon"></app-pokemon-card>
    </div>
  `,
  styles: [`
    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
  `]
})
export class PokemonListComponent implements OnChanges {
  @Input() searchTerm: string = '';
  pokemon: any[] = [];
  filteredPokemon: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemon().subscribe(
      (data: any) => {
        this.pokemon = data.results.map((p: any, index: number) => ({
          ...p,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        this.filterPokemon();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.filterPokemon();
    }
  }

  filterPokemon() {
    this.filteredPokemon = this.pokemon.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}