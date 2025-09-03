import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agenda, AgendaService } from '../../services/agenda';
import { Observable, of, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';
import { CreateContactDialog } from '../../components/create-contact-dialog/create-contact-dialog';
import { Contact, ContactCreate, ContactService } from '../../services/contact';
import { PageResponse } from '../../models/page';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-agenda-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './agenda-detail.html',
  styleUrl: './agenda-detail.scss'
})
export class AgendaDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private agendaService = inject(AgendaService);
  private contactService = inject(ContactService);
  public dialog = inject(MatDialog);

  public agenda$!: Observable<Agenda>;
  private agendaId: string | null = null;

  public displayedColumns: string[] = ['name', 'type', 'phoneNumber', 'createdAt', 'actions'];
  public dataSource = new MatTableDataSource<Contact>();
  public searchControl = new FormControl('');

  public totalElements = 0;
  public pageSize = 10;
  public pageIndex = 0;

  ngOnInit(): void {
    this.agendaId = this.route.snapshot.paramMap.get('id');

    if (this.agendaId) {
      this.agenda$ = this.agendaService.getAgendaById(this.agendaId);

      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.pageIndex = 0),
        switchMap(searchTerm =>
          this.contactService.getContactsByAgendaId(
            this.agendaId as string,
            this.pageIndex,
            this.pageSize,
            searchTerm || ''
          )
        )
      ).subscribe(response => this.updateTable(response));

      this.loadContacts();
    }
  }

  loadContacts(): void {
    if (!this.agendaId) return;
    this.contactService.getContactsByAgendaId(
      this.agendaId,
      this.pageIndex,
      this.pageSize,
      this.searchControl.value || ''
    ).subscribe(response => this.updateTable(response));
  }

  updateTable(response: PageResponse<Contact>): void {
    this.dataSource.data = response.content;
    this.totalElements = response.totalElements;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadContacts();
  }

  openCreateContactDialog(): void {
    const dialogRef = this.dialog.open(CreateContactDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: ContactCreate) => {
      if (result && this.agendaId) {
        this.contactService.createContact(this.agendaId, result).subscribe(() => {
          console.log('Contato criado com sucesso!');
          this.loadContacts();
        });
      }
    });
  }

  openDeleteConfirmDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja remover o contato '${contact.name}'?`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && this.agendaId) {
        this.contactService.deleteContact(contact.id).subscribe(() => {
          console.log('Contato removido com sucesso!');
          this.loadContacts(); // ATUALIZA A TABELA
        });
      }
    });

  }
  openEditContactDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(CreateContactDialog, {
      width: '500px',
      data: contact
    });

    dialogRef.afterClosed().subscribe((result: ContactCreate) => {
      if (result && this.agendaId) {
        this.contactService.updateContact(contact.id, result).subscribe(() => {
          console.log('Contato atualizado com sucesso!');
          this.loadContacts();
        });
      }
    });
  }
}
