import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypetComponent } from './mypet.component';

describe('MypetComponent', () => {
  let component: MypetComponent;
  let fixture: ComponentFixture<MypetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
