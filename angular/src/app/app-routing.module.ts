import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveDataComponent } from './live-data/live-data.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: '',
    component: LiveDataComponent
  },
  {
    path: 'info',
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
