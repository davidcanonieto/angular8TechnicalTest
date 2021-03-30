import { TaskModel } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiServer = 'http://localhost:3000/tasks/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<TaskModel[]>(this.apiServer).pipe(catchError(this.errorHandler));
  }

  getActiveTasks() {
    return this.httpClient.get<TaskModel[]>(this.apiServer)
      .pipe(
        map((tasks: TaskModel[]) => tasks.filter((task) => !task.done)),
        catchError(this.errorHandler)
      );
  }

  getCompletedTasks() {
    return this.httpClient.get<TaskModel[]>(this.apiServer)
      .pipe(
        map((tasks: TaskModel[]) => tasks.filter((task) => task.done)),
        catchError(this.errorHandler)
      );
  }

  getTaskDetails(taskId: string) {
    return this.httpClient.get<TaskModel>(this.apiServer + taskId).pipe(catchError(this.errorHandler));
  }

  saveTask(task: TaskModel) {
    this.httpClient.post<TaskModel>(this.apiServer, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.errorHandler))
      .subscribe((response) => console.log(response));
  }

  deleteTask(taskId: string) {
    this.httpClient.delete<TaskModel>(this.apiServer + taskId, this.httpOptions)
      .pipe(catchError(this.errorHandler))
      .subscribe((response) => console.log(response));
  }

  updateTask(task: TaskModel) {
    this.httpClient.put<TaskModel>(this.apiServer + task.id, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.errorHandler))
      .subscribe((response) => console.log(response));
  }

  completeTask(task: TaskModel) {
    task.completionDate = new Date();
    task.done = true;
    this.updateTask(task);
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
