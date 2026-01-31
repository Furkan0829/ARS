import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { NewVisitFormComponent } from './new-visit-form.component';

describe('NewVisitFormComponent', () => {
  let component: NewVisitFormComponent;
  let fixture: ComponentFixture<NewVisitFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewVisitFormComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewVisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // -----------------------------
  // BASIC TESTS
  // -----------------------------
  it('should create the New Visit form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component successfully', () => {
    expect(component).toBeDefined();
  });
});
