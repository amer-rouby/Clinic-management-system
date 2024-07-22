import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../../../../Shared/modules/shared.material.module';
import { Installment } from '../../../Models/Installment.module';
import { AddInstallmentService } from '../../../Services/add-installment.service';
import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-installment-details-dialog',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './installment-details-dialog.component.html',
})
export class InstallmentDetailsDialogComponent {
  installments: Installment[] = []; // مصفوفة لتخزين تفاصيل الأقساط
  totalPaid: number = 0; // إجمالي المبلغ المدفوع من الأقساط
  remainingAmount: number = 0; // المبلغ المتبقي من إجمالي المبلغ الذي سيتم دفعه
  installmentForm: FormGroup; // نموذج لإضافة قسط جديد
  isLoading = false; // حالة التحميل للتعامل مع التأخيرات أو العمليات غير المتزامنة
  totalAmount: number; // إجمالي المبلغ الذي سيتم دفعه على أقساط
  displayedColumns: string[] = ['dueDate', 'description', 'amount', 'actions']; // إضافة عمود الإجراءات
  isEditMode = false; // حالة تعديل القسط الحالي
  currentInstallmentId: string | null = null; // تخزين معرف القسط الحالي
  ADD_OR_EDIT= "ADD_BUTTON";
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InstallmentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addInstallmentService: AddInstallmentService, // تعديل هنا
    private dialog: MatDialog,
  ) {
    this.totalAmount = data.totalAmount || 0;
    this.loadInstallments(data.patientName); // تعديل هنا

    this.installmentForm = this.fb.group({
      dueDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

  // دالة لجلب الأقساط من الخدمة بناءً على اسم المريض
  loadInstallments(patientName: string) {
    this.isLoading = true;
    this.addInstallmentService.getInstallmentsByPatient(patientName).subscribe({
      next: (installments) => {
        this.installments = installments;
        this.calculateTotals();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching installments', error);
        this.isLoading = false;
      }
    });
  }

  // دالة لحساب إجمالي المبلغ المدفوع والمبلغ المتبقي
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
        patientName: this.data.patientName // تأكد من إضافة اسم المريض هنا
      };

      if (this.isEditMode && this.currentInstallmentId) {
        this.addInstallmentService.updateInstallment(this.currentInstallmentId, newInstallment).subscribe({
          next: () => {
            this.installmentForm.reset();
            this.isEditMode = false;
            this.currentInstallmentId = null;
            this.loadInstallments(this.data.patientName); // استدعاء الدالة لجلب الأقساط مرة أخرى
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
            this.loadInstallments(this.data.patientName); // استدعاء الدالة لجلب الأقساط مرة أخرى
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
      width: '350px',
      data: { message: 'Are you sure you want to delete this installment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteInstallment(id);
      }
    });
  }

  // دالة لحذف القسط
  deleteInstallment(id: string) {
    this.isLoading = true;
    this.addInstallmentService.deleteInstallment(id).subscribe({
      next: () => {
        this.loadInstallments(this.data.patientName); // استدعاء الدالة لجلب الأقساط مرة أخرى
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
    return date ? date > today : false;
  }
}
