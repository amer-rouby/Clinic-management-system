import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../materail-ui/delete-confirm-dialog/confirm-dialog.component';

import { SharedMaterialModule } from '../../../Shared/shared.material.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Todo } from '../../Models/todos';
import { TodoService } from '../../Services/todos.service';
import { AddTodoComponent } from './add-todo/add-todo.component';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    templateUrl: './todo-list.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
        SharedMaterialModule,
    ],
    styleUrls: ['./todo-list.component.scss']
})
export class TodoComponent implements OnInit {
    todoForm: FormGroup;
    todos: Todo[] = [];
    newTodo: Todo = { id: '' , title: "", date: new Date(), completed: false, phoneNumber: '', description: '' };

    currentPage: number = 0;
    itemsPerPage: number = 5;

    selectedTodos: Todo[] = [];
    editingTodo: Todo | null = null;
    loadingData:boolean = false;
    Add_And_Edite_Button: string = "ADD";

    dataSource = new MatTableDataSource<Todo>(this.todos);
    displayedColumns: string[] = ['checkbox', 'title', 'phoneNumber', 'date', 'description', 'updateButton', 'deleteButton'];

    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    constructor(public fb: FormBuilder, public dialog: MatDialog, private todoService: TodoService) {
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
        this.loadingData = true
        this.todoService.getAllTodos().subscribe(todos => {
            this.todos = todos;
            this.dataSource.data = this.todos;
            this.loadingData = false
        });
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(AddTodoComponent, {
            width: '600px',
            height: "450px"
        });

        dialogRef.componentInstance.todoAdded.subscribe(() => {
            this.loadTodos();
        });
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
        this.loadingData = true
        if (this.editingTodo) {
            const updatedTodo: Todo = { ...this.editingTodo, ...this.todoForm.value };
            this.todoService.updateTodo(this.editingTodo.id, updatedTodo).subscribe(() => {
                this.loadTodos();
                this.editingTodo = null;
                this.loadingData = false
            });
        }
    }

    confirmDelete(todoId: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteTodo(todoId);
            }
        });
    }

    deleteTodo(todoId: string) {
        this.loadingData = true
        this.todoService.deleteTodo(todoId).subscribe(() => {
            this.loadingData = false
            this.loadTodos();
        });
    }

    toggleTodoCompletion(todo: Todo) {
        todo.completed = !todo.completed;
        this.todoService.updateTodo(todo.id, todo).subscribe();
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
}
