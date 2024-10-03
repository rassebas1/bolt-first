import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ItemListComponent } from './item-list.component';
import { ApiService } from '../api.service';
import { ItemCardComponent } from '../item-card/item-card.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getItems']);

    await TestBed.configureTestingModule({
      imports: [ItemListComponent, ItemCardComponent],
      providers: [
        { provide: ApiService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ theme: 'pokemon' })
          }
        }
      ]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    apiServiceSpy.getItems.and.returnValue(of([
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { id: 3, name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
    ]));

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items on init', () => {
    expect(component.items.length).toBe(3);
    expect(component.items[0].name).toBe('bulbasaur');
  });

  it('should update currentTheme when route params change', () => {
    expect(component.currentTheme).toBe('pokemon');
    (component as any).route.params.next({ theme: 'berries' });
    expect(component.currentTheme).toBe('berries');
  });

  it('should call getItems with correct theme', () => {
    expect(apiServiceSpy.getItems).toHaveBeenCalledWith('pokemon');
    (component as any).route.params.next({ theme: 'berries' });
    expect(apiServiceSpy.getItems).toHaveBeenCalledWith('berries');
  });

  it('should render ItemCardComponent for each item', () => {
    const itemCards = fixture.nativeElement.querySelectorAll('app-item-card');
    expect(itemCards.length).toBe(3);
  });
});