import { TaskModel } from './../../models/task.model';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { NewTaskDialog } from '../new-task-dialog/new-task-dialog.component';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss']
})
export class ActiveTasksComponent implements OnInit {

  tasks$: Observable<TaskModel[]>;

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.tasks$ = this.taskService.getActiveTasks();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTaskDialog, {
      width: '70%',
      data: { title: 'Create new task' }
    });

    dialogRef.afterClosed().subscribe(() => this.reloadData());
  }
}
