import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Contact } from '../../services/contact';

@Component({
  selector: 'app-create-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './create-contact-dialog.html',
  styleUrl: './create-contact-dialog.scss'
})
export class CreateContactDialog {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<CreateContactDialog>);

  public form: FormGroup;
  public isEditMode: boolean;
  public title: string;

  contactTypes = [
    { value: 'FIXED_LINE', viewValue: 'Fixo' },
    { value: 'MOBILE', viewValue: 'Celular' },
    { value: 'FAX', viewValue: 'Fax' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Contact | null) {
    this.isEditMode = !!this.data; // Se 'data' existe, estamos em modo de edição
    this.title = this.isEditMode ? 'Editar Contato' : 'Adicionar Novo Contato';

    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      areaCode: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8,9}$/)]]
    });

    if (this.isEditMode && this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
