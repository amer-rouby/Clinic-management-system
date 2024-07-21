import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../../Shared/modules/shared.material.module';
import { PatientInstallmentService } from '../../Services/PatientInstallment.service';
import { AddEditInstallmentDialogComponent } from './add-patient-installments/add-patient-installments.component';
import { ConfirmDialogComponent } from '../../materail-ui/delete-confirm-dialog/confirm-dialog.component';
import { ThemeService } from '../../Services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-installments',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './patient-installments.component.html',
  styleUrls: ['./patient-installments.component.scss']
})
export class PatientInstallmentsComponent implements OnInit {
  installments: any[] = [];
  displayedColumns: string[] = ['patientName', 'amount', 'dueDate', 'description', 'actions'];
  dataSource: any[] = []; // Define dataSource
  isLoading = false;
  searchTerm: string = '';
  themeColor: string = 'primary';
  themeSubscription!: Subscription;

  constructor(
    private patientInstallmentService: PatientInstallmentService,
    private dialog: MatDialog,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadInstallments();
    this.themeSubscription = this.themeService.themeColor$.subscribe(color => {
      this.themeColor = color;
  });
  }
  ngOnDestroy(): void  {
    if (this.themeSubscription) {
        this.themeSubscription.unsubscribe();
    }
}
  loadInstallments() {
    this.isLoading = true;
    this.patientInstallmentService.getAllInstallments().subscribe({
      next: (data) => {
        this.installments = data;
        this.dataSource = this.installments; // Set dataSource
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    this.isLoading = true;
    const searchTermLower = this.searchTerm.toLowerCase();
    this.dataSource = this.installments.filter(installment =>
      
      installment.patientName.toLowerCase().includes(searchTermLower)
    );
    this.isLoading = false;
  }

  openAddEditDialog(installment?: any) {
    const dialogRef = this.dialog.open(AddEditInstallmentDialogComponent, {
      data: { installment },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInstallments();
      }
    });
  }

  confirmDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
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
    this.patientInstallmentService.deleteInstallment(id).subscribe({
      next: () => this.loadInstallments(),
      error: (error) => console.error('Error deleting installment', error),
    });
    this.isLoading = false;
  }

     // Utility
     getThemeColor(): any {
      return this.themeColor === 'primary' ? '#3f51b5' : '#e91e63';
  }
  
}
