import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Pokemon, Berry } from './interfaces/item.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pokemon list', () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    service.getItems('pokemon').subscribe(pokemon => {
      expect(pokemon.length).toBe(2);
      expect(pokemon[0].name).toBe('bulbasaur');
      expect(pokemon[0].id).toBe(1);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get pokemon details', () => {
    const mockResponse: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      types: [{ type: { name: 'grass' } }],
      stats: [{ base_stat: 45, stat: { name: 'hp' } }],
      abilities: [{ ability: { name: 'overgrow' } }]
    };

    service.getItemDetails('pokemon', 'bulbasaur').subscribe(details => {
      expect(details).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get berry details', () => {
    const mockResponse: Berry = {
      id: 1,
      name: 'cheri',
      url: 'https://pokeapi.co/api/v2/berry/1/',
      flavor_text_entries: [{ text: 'Spicy' }],
      natural_gift_power: 60
    };

    service.getItemDetails('berries', 'cheri').subscribe(details => {
      expect(details).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/berry/cheri');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should use correct endpoint for different themes', () => {
    service.getItems('pokemon').subscribe();
    httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20');

    service.getItems('berries').subscribe();
    httpMock.expectOne('https://pokeapi.co/api/v2/berry?limit=20');

    service.getItems('contests').subscribe();
    httpMock.expectOne('https://pokeapi.co/api/v2/contest-type?limit=20');

    service.getItems('games').subscribe();
    httpMock.expectOne('https://pokeapi.co/api/v2/version?limit=20');
  });
});