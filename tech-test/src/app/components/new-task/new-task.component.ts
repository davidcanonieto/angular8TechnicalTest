import { TaskService } from './../../services/task.service';
import { TaskModel } from './../../models/task.model';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  @Input() task: TaskModel;
  @Input() editMode: boolean;
  @Output() taskCreated: EventEmitter<any> = new EventEmitter();

  categories = ['work', 'personal'];
  priorities = ['high', 'medium', 'low'];

  taskForm: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.initTaskForm();
  }

  initTaskForm() {
    this.taskForm = new FormGroup({
      label: new FormControl(this.task && this.task.label ? this.task.label : '', Validators.required),
      description: new FormControl(this.task && this.task.description ? this.task.description : ''),
      dueDate: new FormControl(this.task && this.task.dueDate ? this.task.dueDate : null),
      category: new FormControl(this.task && this.task.category ? this.task.category : ''),
      priority: new FormControl(this.task && this.task.priority ? this.task.priority : '')
    });
  }

  saveTask() {
    const newTask = this.createTask();

    if (this.task) {
      newTask.id = this.task.id;
      this.taskService.updateTask(newTask);
    } else {
      this.taskService.saveTask(newTask);
    }

    this.taskCreated.emit();
  }

  createTask(): TaskModel {
    return {
      label: this.taskForm.get('label').value,
      description: this.taskForm.get('description').value,
      category: this.taskForm.get('category').value,
      priority: this.taskForm.get('priority').value,
      dueDate: this.taskForm.get('dueDate').value
    } as TaskModel;
  }

  get labelControl(): AbstractControl {
    return this.taskForm.get('label');
  }

  get descriptionControl(): AbstractControl {
    return this.taskForm.get('description');
  }

  get dueDateControl(): AbstractControl {
    return this.taskForm.get('dueDate');
  }

  get categoryControl(): AbstractControl {
    return this.taskForm.get('category');
  }

  get priorityControl(): AbstractControl {
    return this.taskForm.get('priority');
  }
}
