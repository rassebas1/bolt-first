import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonSearchComponent } from './pokemon-search.component';
import { FormsModule } from '@angular/forms';

describe('PokemonSearchComponent', () => {
  let component: PokemonSearchComponent;
  let fixture: ComponentFixture<PokemonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSearchComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when onSearch is called', () => {
    const testTerm = 'pikachu';
    spyOn(component.searchEvent, 'emit');
    component.searchTerm = testTerm;
    component.onSearch();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(testTerm);
  });
});