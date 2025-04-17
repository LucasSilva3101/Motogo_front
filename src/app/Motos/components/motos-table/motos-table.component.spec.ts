import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotosTableComponent } from './motos-table.component';

describe('MotosTableComponent', () => {
  let component: MotosTableComponent;
  let fixture: ComponentFixture<MotosTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotosTableComponent]
    });
    fixture = TestBed.createComponent(MotosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
