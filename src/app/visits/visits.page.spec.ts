import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitsPage } from './visits.page';
import { VisitsService } from './services/visits.service';
import { of } from 'rxjs';
import { ModalController } from '@ionic/angular';

describe('VisitsPage', () => {
  let component: VisitsPage;
  let fixture: ComponentFixture<VisitsPage>;
  let visitsServiceSpy: jasmine.SpyObj<VisitsService>;

  const modalControllerMock = {
  create: jasmine.createSpy('create').and.returnValue(
    Promise.resolve({
      present: jasmine.createSpy('present'),
      dismiss: jasmine.createSpy('dismiss')
    })
  )
};

  beforeEach(async () => {
    visitsServiceSpy = jasmine.createSpyObj('VisitsService', ['getVisits', 'init']);

    await TestBed.configureTestingModule({
      declarations: [VisitsPage],
      providers: [
        { provide: VisitsService, useValue: visitsServiceSpy },
        { provide: ModalController, useValue: modalControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitsPage);
    component = fixture.componentInstance;
  });

  it('should create the Visits page', () => {
    expect(component).toBeTruthy();
  });

  it('should normalize Scheduled to Pending', () => {
    expect(component.normalizeStatus('Scheduled')).toBe('Pending');
    expect(component.normalizeStatus('Reschedule')).toBe('Pending');
  });

  it('should fetch visits with selected date', () => {
    component.selectedDate = '2026-01-23';

    visitsServiceSpy.getVisits.and.returnValue(of({
      date: '2026-01-23',
      plannedVisits: []
    }));

    component.fetchData();

    expect(visitsServiceSpy.getVisits)
      .toHaveBeenCalledWith('2026-01-23');
  });

  it('should map API response to visits list', () => {
    visitsServiceSpy.getVisits.and.returnValue(of({
      date: '2026-01-23',
      plannedVisits: [
        {
          visitname: 'ARSENI',
          status: 'Scheduled',
          address: 'Mangalore',
          contactperson: 'ARSENI',
          contactnumber: '9999999999'
        }
      ]
    }));

    component.fetchData();

    expect(component.visits.length).toBe(1);
    expect(component.visits[0].status).toBe('Pending');
  });
});
