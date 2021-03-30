import { TaskModel } from './../../models/task.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string;
  task: TaskModel;
  canEdit: boolean;
}

@Component({
  selector: 'new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<NewTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onTaskCreated() {
      this.dialogRef.close();
    }
}
