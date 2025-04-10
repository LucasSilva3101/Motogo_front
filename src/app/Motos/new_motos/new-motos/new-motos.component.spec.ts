import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMotosComponent } from './new-motos.component';

describe('NewMotosComponent', () => {
  let component: NewMotosComponent;
  let fixture: ComponentFixture<NewMotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMotosComponent]
    });
    fixture = TestBed.createComponent(NewMotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
