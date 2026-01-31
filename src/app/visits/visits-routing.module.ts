import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitsPage } from './visits.page';

const routes: Routes = [
  {
    path: '',
    component: VisitsPage
  },  {
    path: 'visit-info',
    loadChildren: () => import('./visit-info/visit-info.module').then( m => m.VisitInfoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitsPageRoutingModule {}
