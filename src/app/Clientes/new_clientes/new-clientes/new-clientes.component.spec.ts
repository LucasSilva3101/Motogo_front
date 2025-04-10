import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientesComponent } from './new-clientes.component';

describe('NewClientesComponent', () => {
  let component: NewClientesComponent;
  let fixture: ComponentFixture<NewClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewClientesComponent]
    });
    fixture = TestBed.createComponent(NewClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
