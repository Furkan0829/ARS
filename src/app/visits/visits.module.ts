import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitsPageRoutingModule } from './visits-routing.module';
import { NewVisitFormComponent } from './new-visit-form/new-visit-form.component';
import { VisitsPage } from './visits.page';
import { HttpClientModule } from '@angular/common/http';
import { VisitsService } from './services/visits.service';
import { RescheduleVisitComponent } from './reschedule-visit/reschedule-visit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [VisitsPage, NewVisitFormComponent, RescheduleVisitComponent],
  providers: [VisitsService]
})
export class VisitsPageModule {}
