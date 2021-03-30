import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ActiveTasksComponent } from './components/active-tasks/active-tasks.component';
import { NewTaskDialog } from './components/new-task-dialog/new-task-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    NewTaskComponent,
    SidenavComponent,
    ActiveTasksComponent,
    CompletedTasksComponent,
    NewTaskDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewTaskDialog],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
