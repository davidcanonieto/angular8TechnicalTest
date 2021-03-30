import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { TaskServiceMock } from '../../mocks/task-service.mock';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';

import { CompletedTasksComponent } from './completed-tasks.component';

describe('CompletedTasksComponent', () => {
  let component: CompletedTasksComponent;
  let fixture: ComponentFixture<CompletedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTasksComponent, TaskListComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TaskService, useClass: TaskServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
