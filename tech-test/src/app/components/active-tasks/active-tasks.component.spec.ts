import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { TaskServiceMock } from '../../mocks/task-service.mock';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';

import { ActiveTasksComponent } from './active-tasks.component';

describe('ActiveTasksComponent', () => {
  let component: ActiveTasksComponent;
  let service: TaskService;
  let fixture: ComponentFixture<ActiveTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTasksComponent, TaskListComponent ],
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
    fixture = TestBed.createComponent(ActiveTasksComponent);
    service = TestBed.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tasks labels in task list', () => {
    const taskLabels = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-label"]');
    expect(taskLabels.length).toBe(3);
    expect(taskLabels[0].innerText).toBe('task1');
    expect(taskLabels[1].innerText).toBe('task2');
    expect(taskLabels[2].innerText).toBe('task3');
  });

  it('should display tasks descriptions in task list', () => {
    const taskDescriptions = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-description"]');
    expect(taskDescriptions.length).toBe(3);
    expect(taskDescriptions[0].innerText).toBe('task1');
    expect(taskDescriptions[1].innerText).toBe('task2');
    expect(taskDescriptions[2].innerText).toBe('task3');
  });

  it('should display tasks categories in task list', () => {
    const taskCategories = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-category"]');
    expect(taskCategories.length).toBe(3);
    expect(taskCategories[0].innerText).toBe('Work');
    expect(taskCategories[1].innerText).toBe('Personal');
    expect(taskCategories[2].innerText).toBe('');
  });

  it('should complete task when task checkbox is clicked', () => {
    const completeTaskSpy = spyOn(service, 'completeTask');
    const taskCheckboxes = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-checkbox"]');
    taskCheckboxes[0].dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(completeTaskSpy).toHaveBeenCalledTimes(1);
  });

  it('should filter tasks when filter is active', async () => {
    let taskLabels = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-label"]');
    expect(taskLabels.length).toBe(3);
    const taskFilter = fixture.debugElement.nativeElement.querySelector('[data-automation-id="task-filter"]');
    taskFilter.value = 'work';
    taskFilter.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();
    taskLabels = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-label"]');
    expect(taskLabels.length).toBe(1);
    expect(taskLabels[0].innerText).toBe('task1');

    taskFilter.value = 'task2';
    taskFilter.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();
    taskLabels = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-label"]');
    expect(taskLabels.length).toBe(1);
    expect(taskLabels[0].innerText).toBe('task2');

    taskFilter.value = '';
    taskFilter.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();
    taskLabels = fixture.debugElement.nativeElement.querySelectorAll('.mat-row [data-automation-id="task-label"]');
    expect(taskLabels.length).toBe(3);
  });
});
