import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, Pokemon, Berry, Contest, Game } from './interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getItems(theme: string): Observable<Item[]> {
    const endpoint = this.getEndpoint(theme);
    return this.http.get<{results: Item[]}>(`${this.baseUrl}/${endpoint}?limit=20`).pipe(
      map(response => response.results.map((item, index) => ({...item, id: index + 1})))
    );
  }

  getItemDetails(theme: string, name: string): Observable<Item> {
    const endpoint = this.getEndpoint(theme);
    return this.http.get<Item>(`${this.baseUrl}/${endpoint}/${name}`);
  }

  private getEndpoint(theme: string): string {
    switch (theme) {
      case 'pokemon':
        return 'pokemon';
      case 'berries':
        return 'berry';
      case 'contests':
        return 'contest-type';
      case 'games':
        return 'version';
      default:
        return 'pokemon';
    }
  }
}