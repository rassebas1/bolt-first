import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img [src]="getImageUrl()" [alt]="item.name">
          <h2>{{ item.name | titlecase }}</h2>
          <ng-container [ngSwitch]="theme">
            <p *ngSwitchCase="'pokemon'">Type: {{ getPokemonTypes() }}</p>
            <p *ngSwitchCase="'berries'">Natural Gift Power: {{ (item as any).natural_gift_power }}</p>
            <p *ngSwitchCase="'contests'">Contest Type: {{ (item as any).contest_type?.name | titlecase }}</p>
            <p *ngSwitchCase="'games'">Platform: {{ (item as any).platform?.name | titlecase }}</p>
          </ng-container>
        </div>
      </div>
      <button [routerLink]="['/', theme, item.name]" class="more-details-btn">More Details</button>
    </div>
  `,
  styles: [/* ... */]
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Input() theme: string = 'pokemon';

  getImageUrl(): string {
    switch (this.theme) {
      case 'pokemon':
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.item.id}.png`;
      case 'berries':
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${this.item.name}-berry.png`;
      case 'games':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
      case 'contests':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/contest-ribbon.png';
      default:
        return '';
    }
  }

  getPokemonTypes(): string {
    if (this.theme === 'pokemon') {
      return (this.item as any).types?.map((t: any) => t.type.name).join(', ') || 'Unknown';
    }
    return '';
  }
}