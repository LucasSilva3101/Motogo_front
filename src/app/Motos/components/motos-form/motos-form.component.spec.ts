import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotosFormComponent } from './motos-form.component';

describe('MotosFormComponent', () => {
  let component: MotosFormComponent;
  let fixture: ComponentFixture<MotosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotosFormComponent]
    });
    fixture = TestBed.createComponent(MotosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
