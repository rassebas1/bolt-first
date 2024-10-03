import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonService } from '../pokemon.service';
import { of } from 'rxjs';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PokemonService', ['getPokemonDetails']);

    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [{ provide: PokemonService, useValue: spy }]
    }).compileComponents();

    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = { name: 'pikachu', sprite: 'pikachu.png' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should flip card when clicked', () => {
    expect(component.isFlipped).toBeFalse();
    component.flipCard();
    expect(component.isFlipped).toBeTrue();
  });

  it('should load pokemon details when flipped for the first time', () => {
    const mockDetails = {
      stats: [{ stat: { name: 'hp' }, base_stat: 35 }],
      moves: [{ move: { name: 'tackle' } }]
    };
    pokemonServiceSpy.getPokemonDetails.and.returnValue(of(mockDetails));

    component.flipCard();
    expect(pokemonServiceSpy.getPokemonDetails).toHaveBeenCalledWith('pikachu');
    expect(component.pokemonDetails).toEqual(mockDetails);
  });
});