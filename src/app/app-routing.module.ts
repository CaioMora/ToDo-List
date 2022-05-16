import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditTaskComponent } from './views/edit-task/edit-task.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'profile',  loadChildren: () => import('../app/views/profile/profile.module').then(x => x.ProfileModule)},
  {path: 'editar/:id', component: EditTaskComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
