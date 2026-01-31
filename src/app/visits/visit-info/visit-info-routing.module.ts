import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitInfoPage } from './visit-info.page';

const routes: Routes = [
  {
    path: '',
    component: VisitInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitInfoPageRoutingModule {}
