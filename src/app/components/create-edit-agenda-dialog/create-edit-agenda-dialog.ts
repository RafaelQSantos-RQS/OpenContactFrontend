import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Agenda } from '../../services/agenda';

@Component({
  selector: 'app-create-edit-agenda-dialog',
  standalone: true,
  imports: [ ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './create-edit-agenda-dialog.html',
})
export class CreateEditAgendaDialog {
  public form: FormGroup;
  public isEditMode: boolean;
  public title: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditAgendaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Agenda | null
  ) {
    this.isEditMode = !!this.data;
    this.title = this.isEditMode ? 'Editar Agenda' : 'Criar Nova Agenda';

    this.form = this.fb.group({
      name: ['', Validators.required]
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
