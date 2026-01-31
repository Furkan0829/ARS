import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitInfoPage } from './visit-info.page';

describe('VisitInfoPage', () => {
  let component: VisitInfoPage;
  let fixture: ComponentFixture<VisitInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
