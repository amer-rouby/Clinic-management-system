import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../../../Models/todo.module';
import { TodoService } from '../../../Services/todos.service';
import { noFutureDateValidator } from '../../../../Shared/Date-Validator/FutureDateValidator';
import { SharedMaterialModule } from '../../../../Shared/modules/shared.material.module';

@Component({
  selector: 'app-add-todo',
  standalone:true,
  imports: [SharedMaterialModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  addTodoForm: FormGroup;
  loadingData: boolean = false;
  @Output() todoAdded = new EventEmitter<Todo>();
  isEdit: boolean = false;
  todo: Todo | null = null;
  ADD_OR_MODIFY_BUTTON = "ADD_BUTTON";

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private todoService: TodoService,
  ) {
    this.addTodoForm = this.fb.group({
      title: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^\\+?[0-9]{10,12}$'),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]],
      description: ['', Validators.required],
      date: [null, [Validators.required, noFutureDateValidator()]],
      completed: [false] // Initialize completed field
    });

    if (data && data.todo) {
      this.isEdit = true;
      this.todo = data.todo;
      this.ADD_OR_MODIFY_BUTTON = 'EDIT_BUTTON'
    }
  }

  ngOnInit() {
    if (this.todo) {
      this.addTodoForm.patchValue({
        title: this.todo.title,
        phoneNumber: this.todo.phoneNumber,
        description: this.todo.description,
        date: this.todo.date,
        completed: this.todo.completed,
      });
    }
  }

  addTodo() {
    this.loadingData = true;

    if (this.addTodoForm.valid) {
      if (this.isEdit && this.todo) {
        const updatedTodo: Todo = { ...this.todo, ...this.addTodoForm.value };
        this.todoService.updateTodo(this.todo.id, updatedTodo).subscribe({
          next: (response: any) => {
            this.todoAdded.emit(response);
            this.onClose();
            this.loadingData = false;
          },
          error: (error) => {
            console.error(error);
            this.loadingData = false;
          },
        });
      } else {
        this.todoService.addTodo(this.addTodoForm.value).subscribe({
          next: (response) => {
            this.todoAdded.emit(response);
            this.onClose();
            this.loadingData = false;
          },
          error: (error) => {
            console.error(error);
            this.loadingData = false;
          },
        });
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
