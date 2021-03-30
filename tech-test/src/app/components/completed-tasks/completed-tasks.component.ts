import { TaskService } from './../../services/task.service';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {

  displayedColumns = ['label', 'description', 'category', 'priority', 'completionDate'];

  tasks$: Observable<TaskModel[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.tasks$ = this.taskService.getCompletedTasks();
  }
}
