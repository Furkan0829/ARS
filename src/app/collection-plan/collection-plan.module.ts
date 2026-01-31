import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionPlanPageRoutingModule } from './collection-plan-routing.module';

import { CollectionPlanPage } from './collection-plan.page';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionPlanPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CollectionPlanPage]
})
export class CollectionPlanPageModule {}
