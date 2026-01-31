import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { CollectionPlanPage } from './collection-plan.page';

describe('CollectionPlanPage', () => {
  let component: CollectionPlanPage;
  let fixture: ComponentFixture<CollectionPlanPage>;

  const modalControllerMock = {
    create: jasmine.createSpy('create').and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
        dismiss: jasmine.createSpy('dismiss')
      })
    )
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [CollectionPlanPage],
      providers: [
        { provide: ModalController, useValue: modalControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
