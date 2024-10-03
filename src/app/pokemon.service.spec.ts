import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
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
        { name: 'bulbasaur' },
        { name: 'charmander' }
      ]
    };

    service.getPokemon().subscribe(pokemon => {
      expect(pokemon).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get pokemon details', () => {
    const mockResponse = {
      name: 'pikachu',
      stats: [{ stat: { name: 'hp' }, base_stat: 35 }],
      moves: [{ move: { name: 'tackle' } }]
    };

    service.getPokemonDetails('pikachu').subscribe(details => {
      expect(details).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});