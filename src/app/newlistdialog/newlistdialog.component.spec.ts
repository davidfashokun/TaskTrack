import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDialogComponent } from './newlistdialog.component';

describe('TodoListDialogComponent', () => {
  let component: TodoListDialogComponent;
  let fixture: ComponentFixture<TodoListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
