import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitInfoPageRoutingModule } from './visit-info-routing.module';

import { VisitInfoPage } from './visit-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitInfoPageRoutingModule
  ],
  declarations: [VisitInfoPage]
})
export class VisitInfoPageModule {}
