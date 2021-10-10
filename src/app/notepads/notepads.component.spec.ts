import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadsComponent } from './notepads.component';

describe('NotepadsComponent', () => {
  let component: NotepadsComponent;
  let fixture: ComponentFixture<NotepadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotepadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
