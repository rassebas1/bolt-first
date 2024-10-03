import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemCardComponent } from './item-card.component';
import { Pokemon } from '../interfaces/item.interface';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
    } as Pokemon;
    component.theme = 'pokemon';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct image URL for pokemon', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('should display correct name', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(nameElement.textContent).toContain('Bulbasaur');
  });

  it('should display correct types for pokemon', () => {
    const typeElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(typeElement.textContent).toContain('Type: grass, poison');
  });

  it('should have a "More Details" button with correct link', () => {
    const buttonElement: HTMLAnchorElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('More Details');
    expect(buttonElement.getAttribute('ng-reflect-router-link')).toBe('/,pokemon,bulbasaur');
  });

  it('should change image URL based on theme', () => {
    component.theme = 'berries';
    component.item = { id: 1, name: 'cheri', url: 'https://pokeapi.co/api/v2/berry/1/' };
    fixture.detectChanges();
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png');
  });
});