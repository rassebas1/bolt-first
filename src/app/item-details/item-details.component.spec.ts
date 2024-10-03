import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ItemDetailsComponent } from './item-details.component';
import { ApiService } from '../api.service';
import { Pokemon } from '../interfaces/item.interface';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getItemDetails']);

    await TestBed.configureTestingModule({
      imports: [ItemDetailsComponent],
      providers: [
        { provide: ApiService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ theme: 'pokemon', name: 'bulbasaur' })
          }
        }
      ]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } }
      ],
      abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }]
    };

    apiServiceSpy.getItemDetails.and.returnValue(of(mockPokemon));

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load item details on init', () => {
    expect(component.item).toBeTruthy();
    expect(component.item?.name).toBe('bulbasaur');
  });

  it('should display correct name', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(nameElement.textContent).toContain('Bulbasaur');
  });

  it('should display correct image', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('should display stats for pokemon', () => {
    const statElements = fixture.nativeElement.querySelectorAll('li');
    expect(statElements[0].textContent).toContain('Hp: 45');
    expect(statElements[1].textContent).toContain('Attack: 49');
  });

  it('should display abilities for pokemon', () => {
    const abilityElements = fixture.nativeElement.querySelectorAll('li');
    expect(abilityElements[2].textContent).toContain('Overgrow');
    expect(abilityElements[3].textContent).toContain('Chlorophyll');
  });

  it('should update theme and load new details when route params change', () => {
    (component as any).route.params.next({ theme: 'berries', name: 'cheri' });
    expect(component.theme).toBe('berries');
    expect(apiServiceSpy.getItemDetails).toHaveBeenCalledWith('berries', 'cheri');
  });
});