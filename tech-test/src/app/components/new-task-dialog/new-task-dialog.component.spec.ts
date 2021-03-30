import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { TaskServiceMock } from 'src/app/mocks/task-service.mock';
import { TaskService } from 'src/app/services/task.service';
import { NewTaskComponent } from '../new-task/new-task.component';

import { NewTaskDialog } from './new-task-dialog.component';

describe('NewTaskDialogComponent', () => {
  let component: NewTaskDialog;
  let fixture: ComponentFixture<NewTaskDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaskDialog, NewTaskComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TaskService, useClass: TaskServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
