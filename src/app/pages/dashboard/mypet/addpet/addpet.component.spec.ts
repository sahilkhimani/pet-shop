import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpetComponent } from './addpet.component';

describe('AddpetComponent', () => {
  let component: AddpetComponent;
  let fixture: ComponentFixture<AddpetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
