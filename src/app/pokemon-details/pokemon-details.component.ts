import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokemon-details" *ngIf="pokemonDetails">
      <h2>{{ pokemonDetails.name | titlecase }}</h2>
      <img [src]="pokemonDetails.sprites.front_default" [alt]="pokemonDetails.name">
      
      <h3>Stats</h3>
      <ul>
        <li *ngFor="let stat of pokemonDetails.stats">
          {{ stat.stat.name | titlecase }}: {{ stat.base_stat }}
        </li>
      </ul>

      <h3>Abilities</h3>
      <ul>
        <li *ngFor="let ability of pokemonDetails.abilities">
          {{ ability.ability.name | titlecase }}
        </li>
      </ul>

      <h3>Moves</h3>
      <ul class="moves-list">
        <li *ngFor="let move of pokemonDetails.moves.slice(0, 10)">
          {{ move.move.name | titlecase }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .pokemon-details {
      background-color: #f0f0f0;
      border-radius: 10px;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #3c5aa6;
      text-align: center;
      font-size: 2em;
      margin-bottom: 20px;
    }
    img {
      display: block;
      margin: 0 auto;
      width: 200px;
      height: 200px;
    }
    h3 {
      color: #3c5aa6;
      margin-top: 20px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      background-color: #ffcb05;
      color: #3c5aa6;
      margin: 5px 0;
      padding: 5px 10px;
      border-radius: 5px;
    }
    .moves-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .moves-list li {
      width: calc(50% - 5px);
    }
  `]
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonName = this.route.snapshot.paramMap.get('name');
    if (pokemonName) {
      this.pokemonService.getPokemonDetails(pokemonName).subscribe(
        (data: any) => {
          this.pokemonDetails = data;
        }
      );
    }
  }
}