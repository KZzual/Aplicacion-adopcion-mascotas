import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialPostsPage } from './historial-posts.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialPostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialPostsPageRoutingModule {}
