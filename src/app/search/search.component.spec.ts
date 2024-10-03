import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
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

  it('should update placeholder based on theme input', () => {
    component.theme = 'berries';
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.placeholder).toBe('Search berries...');
  });

  it('should update searchTerm when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'charmander';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.searchTerm).toBe('charmander');
  });
});