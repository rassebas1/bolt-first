import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card" [class.flipped]="isFlipped" (click)="flipCard()">
      <div class="card-inner">
        <div class="card-front">
          <img [src]="pokemon.sprite" [alt]="pokemon.name">
          <h2>{{ pokemon.name | titlecase }}</h2>
        </div>
        <div class="card-back">
          <h3>Stats</h3>
          <ul>
            <li *ngFor="let stat of pokemonDetails?.stats">
              {{ stat.stat.name | titlecase }}: {{ stat.base_stat }}
            </li>
          </ul>
          <button [routerLink]="['/pokemon', pokemon.name]" class="more-details-btn">More Details</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      width: 200px;
      height: 300px;
      perspective: 1000px;
      cursor: pointer;
      margin: 10px;
    }
    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    .flipped .card-inner {
      transform: rotateY(180deg);
    }
    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border: 3px solid #ffcb05;
      border-radius: 10px;
      padding: 10px;
      background-color: #3c5aa6;
      color: white;
    }
    .card-front {
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .card-back {
      transform: rotateY(180deg);
      overflow-y: auto;
    }
    .card-front img {
      max-width: 120px;
      height: auto;
    }
    ul {
      padding-left: 20px;
      text-align: left;
    }
    .more-details-btn {
      background-color: #ffcb05;
      color: #3c5aa6;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
    }
    .more-details-btn:hover {
      background-color: #ffd74b;
    }
  `]
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  isFlipped = false;
  pokemonDetails: any;

  constructor(private pokemonService: PokemonService) {}

  flipCard() {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped && !this.pokemonDetails) {
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemon.name).subscribe(
      (data: any) => {
        this.pokemonDetails = data;
      }
    );
  }
}