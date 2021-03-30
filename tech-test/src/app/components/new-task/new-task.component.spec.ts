import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { TaskServiceMock } from '../../mocks/task-service.mock';
import { TaskService } from '../../services/task.service';
import { NewTaskComponent } from './new-task.component';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let service: TaskService;
  let fixture: ComponentFixture<NewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TaskService, useClass: TaskServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    service = TestBed.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable save button when no label is provided', () => {
    const saveButton = fixture.debugElement.nativeElement.querySelector('.task-form-save button');
    expect(saveButton.disabled).toBe(true)
  });

  it('should enable save button when label is provided', () => {
    const labelInput = fixture.debugElement.nativeElement.querySelector('[data-automation-id="label-input"]');
    labelInput.value = 'my label';
    labelInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const saveButton = fixture.debugElement.nativeElement.querySelector('.task-form-save button');
    expect(saveButton.disabled).toBe(false)
  });

  it('should set values from task input', () => {
    component.task = {
      id: 1,
      label: 'myLabel',
      description: 'myDescription',
      category: 'work'
    };
    component.ngOnInit();
    fixture.detectChanges();

    const labelInput = fixture.debugElement.nativeElement.querySelector('[data-automation-id="label-input"]');
    expect(labelInput.value).toBe('myLabel');

    const descriptionInput = fixture.debugElement.nativeElement.querySelector('[data-automation-id="description-input"]');
    expect(descriptionInput.value).toBe('myDescription');

    const categoryInput = fixture.debugElement.nativeElement.querySelector('[data-automation-id="category-input"]');
    expect(categoryInput.innerText.trim()).toBe('Work');
  });

  it('should update task if task was already created', () => {
    component.task = {
      id: 1,
      label: 'myLabel',
      description: 'myDescription',
      category: 'work'
    };
    component.ngOnInit();
    fixture.detectChanges();

    const updateTaskSpy = spyOn(service, 'updateTask');
    const saveButton = fixture.debugElement.nativeElement.querySelector('.task-form-save button');
    saveButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(updateTaskSpy).toHaveBeenCalledTimes(1);
  });

  it('should save task if task is new', () => {
    const saveTaskSpy = spyOn(service, 'saveTask');

    const labelInput = fixture.debugElement.nativeElement.querySelector('[data-automation-id="label-input"]');
    labelInput.value = 'my label';
    labelInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const saveButton = fixture.debugElement.nativeElement.querySelector('.task-form-save button');
    saveButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(saveTaskSpy).toHaveBeenCalledTimes(1);
  });
});
