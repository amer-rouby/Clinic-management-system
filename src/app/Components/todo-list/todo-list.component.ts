import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../materail-ui/delete-confirm-dialog/confirm-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Todo } from '../../Models/todos';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    templateUrl: './todo-list.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
         FormsModule, MatInputModule,
        MatButtonModule, MatCheckboxModule, MatIconModule,
        MatTableModule, MatPaginatorModule, ReactiveFormsModule,
        MatFormFieldModule, MatDatepickerModule,CommonModule
    ],
    styleUrls: ['./todo-list.component.scss']
})
export class TodoComponent implements OnInit {
    todoForm: FormGroup;
    todos: Todo[] = [];
    newTodo: Todo = { id: 0, title: "", date: new Date(), completed: false, phoneNumber: '', description: '' };
    
    currentPage: number = 0;
    itemsPerPage: number = 5;

    selectedTodos: Todo[] = [];
    editingTodo: Todo | null = null;

    Add_And_Edite_Button: string = "ADD";

    dataSource = new MatTableDataSource<Todo>(this.todos);
    displayedColumns: string[] = ['checkbox', 'title', 'phoneNumber', 'date', 'description', 'updateButton', 'deleteButton'];
    
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    constructor(public fb: FormBuilder, public dialog: MatDialog) {
        this.todoForm = this.fb.group({
            title: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            description: ['', Validators.required],
            date: ['', Validators.required],
        });

    }

    ngOnInit() {
        this.loadTodos();
        this.dataSource.paginator = this.paginator;
    }

    loadTodos() {
        if (typeof localStorage !== 'undefined') {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                this.todos = JSON.parse(storedTodos);
                this.dataSource.data = this.todos;
            }
        }
    }

    addTodo() {
        if (this.todoForm.valid) {
            if (this.editingTodo) {
                this.updateTodo();
                this.Add_And_Edite_Button = "ADD";
                this.todoForm.reset();
            } else {
                const newTodoAdd: Todo = { ...this.newTodo, id: Date.now(), ...this.todoForm.value };
                this.todos.push(newTodoAdd);
                this.saveTodos();
                this.loadTodos();
                this.todoForm.reset();
            }
        }
    }

    editTodo(todo: Todo) {
        this.Add_And_Edite_Button = "UPDATE";
        this.editingTodo = todo;
        this.todoForm.setValue({
            title: todo.title,
            phoneNumber: todo.phoneNumber,
            description: todo.description,
            date: todo.date,
        });
    }

    updateTodo() {
        if (this.editingTodo) {
            Object.assign(this.editingTodo, this.todoForm.value);
            this.saveTodos();
            this.editingTodo = null;
        }
    }

    confirmDelete(todoId: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteTodo(todoId);
            }
        });
    }

    deleteTodo(todoId: number) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        this.saveTodos();
        this.loadTodos();
    }

    toggleTodoCompletion(todo: Todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
    }

    sortTodosByTitle() {
        this.todos.sort((a, b) => a.title.localeCompare(b.title));
    }

    sortTodosById() {
        this.todos.sort((a, b) => a.id - b.id);
    }

    isAllSelected(): boolean {
        const numSelected = this.selectedTodos.length;
        const numRows = this.paginatedTodos.length;
        return numSelected === numRows;
    }

    isIndeterminate(): boolean {
        const numSelected = this.selectedTodos.length;
        const numRows = this.paginatedTodos.length;
        return numSelected > 0 && numSelected < numRows;
    }

    selectAll(event: any) {
        if (event.checked) {
            this.selectedTodos = [...this.paginatedTodos];
        } else {
            this.selectedTodos = [];
        }
        this.paginatedTodos.forEach(todo => todo.completed = event.checked);
    }

    toggleSelection(todo: Todo) {
        todo.completed = !todo.completed;
    }

    isSelected(todo: Todo): boolean {
        return todo.completed;
    }

    onPageChange(event: any) {
        this.currentPage = event.pageIndex;
        this.itemsPerPage = event.pageSize;
    }

    get paginatedTodos(): Todo[] {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.todos.slice(startIndex, endIndex);
    }

    get totalPages(): number {
        return Math.ceil(this.todos.length / this.itemsPerPage);
    }

    private saveTodos() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    }
}
