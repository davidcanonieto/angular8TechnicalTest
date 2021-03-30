import { of } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { SINGLE_TASK_MOCK, TASKS_MOCK, COMPLETED_TASKS_MOCK } from './tasks.mock';

export class TaskServiceMock {

  getTasks() {
    return of(TASKS_MOCK);
  }

  getActiveTasks() {
    return of(TASKS_MOCK);
  }

  getCompletedTasks() {
    return of(COMPLETED_TASKS_MOCK);
  }

  getTaskDetails(taskId: string) {
    return of(SINGLE_TASK_MOCK);
  }

  saveTask(task: TaskModel) {

  }

  deleteTask(taskId: string) {

  }

  updateTask(task: TaskModel) {

  }

  completeTask(task: TaskModel) {
    this.updateTask(task);
  }
}
