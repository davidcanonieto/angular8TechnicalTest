import { TaskService } from './../../services/task.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { NewTaskDialog } from '../new-task-dialog/new-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnChanges {
  dataSource: MatTableDataSource<TaskModel>;

  @Input() data: TaskModel[] = [];
  @Input() displayedColumns: string[] = ['select', 'label', 'description', 'category', 'priority', 'dueDate', 'star'];
  @Input() canEdit: boolean = false
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editTask(task: string) {
    const dialogRef = this.dialog.open(NewTaskDialog, {
      width: '70%',
      data: { title: 'Edit task', task, canEdit: true }
    });

    dialogRef.afterClosed().subscribe(() => this.dataChanged.emit());
  }

  completeTask(task: TaskModel) {
    this.taskService.completeTask(task);
    this.dataChanged.emit();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.dataChanged.emit();
  }
}
