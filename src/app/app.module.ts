import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './views/edit-task/edit-task.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './views/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewTaskModalComponent,
    EditTaskComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
