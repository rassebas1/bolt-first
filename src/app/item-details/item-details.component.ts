import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Item, Pokemon, Berry, Contest, Game } from '../interfaces/item.interface';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item-details" *ngIf="item">
      <h2>{{ item.name | titlecase }}</h2>
      <img [src]="getImageUrl()" [alt]="item.name">
      
      <ng-container [ngSwitch]="theme">
        <ng-container *ngSwitchCase="'pokemon'">
          <h3>Stats</h3>
          <ul>
            <li *ngFor="let stat of (item as Pokemon).stats">
              {{ stat.stat.name | titlecase }}: {{ stat.base_stat }}
            </li>
          </ul>
          <h3>Abilities</h3>
          <ul>
            <li *ngFor="let ability of (item as Pokemon).abilities">
              {{ ability.ability.name | titlecase }}
            </li>
          </ul>
        </ng-container>

        <ng-container *ngSwitchCase="'berries'">
          <h3>Flavor</h3>
          <p>{{ (item as Berry).flavor_text_entries[0]?.text }}</p>
          <h3>Natural Gift Power</h3>
          <p>{{ (item as Berry).natural_gift_power }}</p>
        </ng-container>

        <ng-container *ngSwitchCase="'contests'">
          <h3>Contest Type</h3>
          <p>{{ (item as Contest).contest_type?.name | titlecase }}</p>
        </ng-container>

        <ng-container *ngSwitchCase="'games'">
          <h3>Platform</h3>
          <p>{{ (item as Game).platform?.name | titlecase }}</p>
          <h3>Release Date</h3>
          <p>{{ (item as Game).release_date }}</p>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [/* ... */]
})
export class ItemDetailsComponent implements OnInit {
  item: Item | null = null;
  theme: string = 'pokemon';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.theme = params['theme'];
      const itemName = params['name'];
      this.loadItemDetails(itemName);
    });
  }

  loadItemDetails(itemName: string) {
    this.apiService.getItemDetails(this.theme, itemName).subscribe(
      (data: Item) => {
        this.item = data;
      }
    );
  }

  getImageUrl(): string {
    if (!this.item) return '';
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
}