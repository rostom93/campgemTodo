import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TaskDetailsComponent } from './component/task-details/task-details.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'task-details/:taskName/:description', component: TaskDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
