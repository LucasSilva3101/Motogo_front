import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsFormComponent } from './clients-form.component';


describe('ClientsFormComponent', () => {
  let component: ClientsFormComponent;
  let fixture: ComponentFixture<ClientsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsFormComponent]
    });
    fixture = TestBed.createComponent(ClientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
