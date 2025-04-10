import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotosComponent } from './edit-motos.component';

describe('EditMotosComponent', () => {
  let component: EditMotosComponent;
  let fixture: ComponentFixture<EditMotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMotosComponent]
    });
    fixture = TestBed.createComponent(EditMotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
