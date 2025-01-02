import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSideComponent } from './auth-side.component';

describe('AuthSideComponent', () => {
  let component: AuthSideComponent;
  let fixture: ComponentFixture<AuthSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
