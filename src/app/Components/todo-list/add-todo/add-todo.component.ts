import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { SharedMaterialModule } from '../../../../Shared/shared.material.module';
import { Todo } from '../../../Models/todos';
import { TodoService } from '../../../Services/todos.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  addTodoForm: FormGroup;
  loadingData: boolean = false;
  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.addTodoForm = this.fb.group({
      title: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,12}$')]], // Example pattern for phone number
      description: ['', Validators.required],
      date: [null, Validators.required],
    });
  }

  addTodo() {
    this.loadingData = true;
    if (this.addTodoForm.valid) {
      this.todoService.addTodo(this.addTodoForm.value).subscribe({
        next: (response) => {
          this.todoAdded.emit(response); // Emit the added todo
          this.onClose();
          this.loadingData = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
