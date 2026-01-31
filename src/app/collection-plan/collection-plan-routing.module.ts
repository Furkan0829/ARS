import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionPlanPage } from './collection-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionPlanPageRoutingModule {}
