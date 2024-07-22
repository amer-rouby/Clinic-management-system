import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../../../../Shared/modules/shared.material.module';
import { Installment } from '../../../Models/Installment.module';
import { AddInstallmentService } from '../../../Services/add-installment.service';
import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';
import { noFutureDateValidator } from '../../../../Shared/Date-Validator/FutureDateValidator';

@Component({
  selector: 'app-installment-details-dialog',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './installment-details-dialog.component.html',
})
export class InstallmentDetailsDialogComponent {
  installments: Installment[] = [];
  totalPaid: number = 0;
  remainingAmount: number = 0;
  installmentForm: FormGroup;
  isLoading = false;
  totalAmount: number;
  displayedColumns: string[] = ['dueDate', 'description', 'amount', 'actions'];
  isEditMode = false;
  currentInstallmentId: string | null = null;
  ADD_OR_EDIT = "ADD_BUTTON";
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InstallmentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addInstallmentService: AddInstallmentService,
    private dialog: MatDialog,
  ) {
    this.totalAmount = data.totalAmount || 0;
    this.loadInstallments(data.patientName);

    this.installmentForm = this.fb.group({
      dueDate: ['', Validators.required, , noFutureDateValidator()],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }


  loadInstallments(patientName: string) {
    this.isLoading = true;
    this.addInstallmentService.getInstallmentsByPatient(patientName).subscribe({
      next: (installments) => {
        this.installments = installments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        this.calculateTotals();
        this.isLoading = false;
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
      
      const newInstallment: any = {
        dueDate: this.installmentForm.value.dueDate,
        amount: this.installmentForm.value.amount,
        description: this.installmentForm.value.description,
        patientName: this.data.patientName
      };

      if (this.isEditMode && this.currentInstallmentId) {
        this.addInstallmentService.updateInstallment(this.currentInstallmentId, newInstallment).subscribe({
          next: () => {
            this.installmentForm.reset();
            this.isEditMode = false;
            this.currentInstallmentId = null;
            this.loadInstallments(this.data.patientName);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating installment', error);
            this.isLoading = false;
          }
        });
      } else {
        this.addInstallmentService.addInstallment(newInstallment).subscribe({
          next: (addedInstallment: Installment) => {
            this.installmentForm.reset();
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

  editInstallment(installment: any) {
    this.isEditMode = true;
    this.ADD_OR_EDIT = "EDIT_BUTTON"
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
    this.addInstallmentService.deleteInstallment(id).subscribe({
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

  myFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  }

}
