import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../pokemon.service';
import { of } from 'rxjs';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PokemonService', ['getPokemon']);

    await TestBed.configureTestingModule({
      imports: [PokemonListComponent, PokemonCardComponent],
      providers: [{ provide: PokemonService, useValue: spy }]
    }).compileComponents();

    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
  });

  beforeEach(() => {
    pokemonServiceSpy.getPokemon.and.returnValue(of({
      results: [
        { name: 'bulbasaur' },
        { name: 'charmander' },
        { name: 'squirtle' }
      ]
    }));

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon on init', () => {
    expect(component.pokemon.length).toBe(3);
    expect(component.pokemon[0].name).toBe('bulbasaur');
  });

  it('should filter pokemon based on search term', () => {
    component.searchTerm = 'char';
    component.filterPokemon();
    expect(component.filteredPokemon.length).toBe(1);
    expect(component.filteredPokemon[0].name).toBe('charmander');
  });
});