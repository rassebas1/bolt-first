import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  template: `
    <div class="item-grid">
      <app-item-card *ngFor="let item of items" [item]="item" [theme]="currentTheme"></app-item-card>
    </div>
  `,
  styles: [`
    .item-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
  `]
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  currentTheme: string = 'pokemon';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentTheme = params['theme'];
      this.loadItems();
    });
  }

  loadItems() {
    this.apiService.getItems(this.currentTheme).subscribe(
      (data: any) => {
        this.items = data.results.map((item: any, index: number) => ({
          ...item,
          id: index + 1
        }));
      }
    );
  }
}