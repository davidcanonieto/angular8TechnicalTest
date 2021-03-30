import { ActiveTasksComponent } from './components/active-tasks/active-tasks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';

const routes: Routes = [
  { path: '', component: ActiveTasksComponent },
  {
    path: 'active-tasks',
    component: ActiveTasksComponent
  },
  {
    path: 'completed-tasks',
    component: CompletedTasksComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
