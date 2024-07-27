import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../../../../Shared/modules/shared.material.module';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Installment } from '../../../Models/Installment.module';
import { AddInstallmentService } from '../../../Services/add-installment.service';
import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-installment-details-dialog',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './installment-details-dialog.component.html',
  styleUrls: ['./installment-details-dialog.component.scss']
})
export class InstallmentDetailsDialogComponent implements AfterViewInit {
  installments: Installment[] = [];
  totalPaid = 0;
  remainingAmount = 0;
  installmentForm: FormGroup;
  isLoading = false;
  totalAmount: number;
  displayedColumns: string[] = ['dueDate', 'description', 'amount', 'actions'];
  isEditMode = false;
  currentInstallmentId: string | null = null;
  dataSource: MatTableDataSource<Installment>;

  // Variables for pagination
  pageSize: any = "ALL";
  pageSizeOptions = ["ALL", 3, 5, 10, 15];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InstallmentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private installmentService: AddInstallmentService,
    private dialog: MatDialog
  ) {
    this.totalAmount = data.totalAmount || 0;
    this.loadInstallments(data.patientName);

    this.installmentForm = this.fb.group({
      dueDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });

    this.dataSource = new MatTableDataSource(this.installments);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadInstallments(patientName: string) {
    this.isLoading = true;
    this.installmentService.getInstallmentsByPatient(patientName).subscribe({
      next: (installments) => {
        this.installments = installments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        this.calculateTotals();
        this.dataSource.data = this.installments;
        this.isLoading = false;
        this.resetPaginator();
      },
      error: (error) => {
        console.error('Error fetching installments', error);
        this.isLoading = false;
      }
    });
  }

  calculateTotals() {
    this.totalPaid = this.installments.reduce((total, installment) => total + (installment.amount || 0), 0);
    this.remainingAmount = this.totalAmount - this.totalPaid;
  }

  onSubmit() {
    if (this.installmentForm.valid) {
      this.isLoading = true;

      const newInstallment: Installment = {
        dueDate: this.installmentForm.value.dueDate,
        amount: this.installmentForm.value.amount,
        description: this.installmentForm.value.description,
        patientName: this.data.patientName
      };

      if (this.isEditMode && this.currentInstallmentId) {
        this.installmentService.updateInstallment(this.currentInstallmentId, newInstallment).subscribe({
          next: () => {
            this.resetForm();
            this.loadInstallments(this.data.patientName);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating installment', error);
            this.isLoading = false;
          }
        });
      } else {
        this.installmentService.addInstallment(newInstallment).subscribe({
          next: (addedInstallment: Installment) => {
            this.resetForm();
            this.loadInstallments(this.data.patientName);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error adding installment', error);
            this.isLoading = false;
          }
        });
      }
    }
  }

  resetForm() {
    this.installmentForm.reset();
    this.isEditMode = false;
    this.currentInstallmentId = null;
  }

  editInstallment(installment: any) {
    this.isEditMode = true;
    this.currentInstallmentId = installment.id;
    this.installmentForm.patchValue({
      dueDate: installment.dueDate,
      amount: installment.amount,
      description: installment.description
    });
  }

  confirmDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this installment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteInstallment(id);
      }
    });
  }

  deleteInstallment(id: string) {
    this.isLoading = true;
    this.installmentService.deleteInstallment(id).subscribe({
      next: () => {
        this.loadInstallments(this.data.patientName);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting installment', error);
        this.isLoading = false;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  }


  setPageSizeOptions(options: string) {
    this.pageSizeOptions = options.split(',').map(str => str.trim() === 'ALL' ? 'ALL' : +str);
  }

  resetPaginator() {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
    }
  }

  changePageSize(newSize: any) {
    this.pageSize = newSize === 'ALL' ? this.dataSource.data.length : newSize;
    this.resetPaginator();
  }
  currentPageIndex: number = 0;
  handlePageEvent(event: PageEvent) {
    // Handle page event if needed
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
