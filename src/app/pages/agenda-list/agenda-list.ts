import { Component, inject } from '@angular/core';
import { AgendaService, Agenda } from '../../services/agenda';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PageResponse } from '../../models/page';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';
import { CreateEditAgendaDialog } from '../../components/create-edit-agenda-dialog/create-edit-agenda-dialog';



@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './agenda-list.html',
  styleUrl: './agenda-list.scss'
})
export class AgendaList {
  private agendaService = inject(AgendaService);
  public dialog = inject(MatDialog);
  public agendas$: Observable<PageResponse<Agenda>>;

  constructor() {
    this.agendas$ = this.agendaService.getAgendas();
  }

  openCreateAgendaDialog(): void {
    const dialogRef = this.dialog.open(CreateEditAgendaDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agendaService.createAgenda(result).subscribe({
          next: () => {
            console.log('Agenda criada com sucesso!');
            this.agendas$ = this.agendaService.getAgendas();
          },
          error: (err) => console.error('Erro ao criar agenda:', err)
        });
      }
    });
  }

  openDeleteAgendaDialog(agenda: Agenda): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja remover a agenda '${agenda.name}'? Todos os contatos associados a ela também serão perdidos.`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.agendaService.deleteAgenda(agenda.id).subscribe({
          next: () => {
            console.log('Agenda removida com sucesso!');
            this.agendas$ = this.agendaService.getAgendas();
          },
          error: (err) => console.error('Erro ao remover agenda:', err),
        });
      }
    });
  }
  openEditAgendaDialog(agenda: Agenda): void {
    const dialogRef = this.dialog.open(CreateEditAgendaDialog, {
      width: '400px',
      data: agenda
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agendaService.updateAgenda(agenda.id, result).subscribe({
          next: () => {
            console.log('Agenda atualizada com sucesso!');
            this.agendas$ = this.agendaService.getAgendas();
          },
          error: (err) => console.error('Erro ao atualizar agenda:', err)
        });
      }
    });
  }
}
