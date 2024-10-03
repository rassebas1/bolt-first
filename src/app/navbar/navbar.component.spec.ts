import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four theme options', () => {
    const navItems = fixture.nativeElement.querySelectorAll('li');
    expect(navItems.length).toBe(4);
  });

  it('should emit theme change event when a theme is clicked', () => {
    spyOn(component.themeChange, 'emit');
    const berryLink = fixture.nativeElement.querySelector('a[href="/list/berries"]');
    berryLink.click();
    expect(component.themeChange.emit).toHaveBeenCalledWith('berries');
  });

  it('should have correct route for each theme', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].getAttribute('href')).toBe('/list/pokemon');
    expect(links[1].getAttribute('href')).toBe('/list/berries');
    expect(links[2].getAttribute('href')).toBe('/list/contests');
    expect(links[3].getAttribute('href')).toBe('/list/games');
  });
});