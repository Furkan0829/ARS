import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'visits',
    loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule)
  },
  {
  path: 'visit-info',
  loadChildren: () =>
    import('./visits/visit-info/visit-info.module').then(m => m.VisitInfoPageModule)
  },
  {
    path: 'collection-plan',
    loadChildren: () => import('./collection-plan/collection-plan.module').then( m => m.CollectionPlanPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
