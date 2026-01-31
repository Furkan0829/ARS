import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewCollectionPlanFormComponent } from './new-collection-plan-form.component';

describe('NewCollectionPlanFormComponent', () => {
  let component: NewCollectionPlanFormComponent;
  let fixture: ComponentFixture<NewCollectionPlanFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCollectionPlanFormComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCollectionPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
