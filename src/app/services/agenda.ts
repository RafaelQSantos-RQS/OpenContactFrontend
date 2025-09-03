import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page';

export interface Agenda {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/v1/agendas';

  getAgendas(): Observable<PageResponse<Agenda>> {
    return this.http.get<PageResponse<Agenda>>(this.API_URL);
  }

  createAgenda(agendaData: { name: string }): Observable<Agenda> {
    return this.http.post<Agenda>(this.API_URL, agendaData);
  }

  getAgendaById(id: string): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.API_URL}/${id}`);
  }

  deleteAgenda(agendaId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${agendaId}`);
  }

  updateAgenda(agendaId: string, agendaData: { name: string }): Observable<Agenda> {
    return this.http.put<Agenda>(`${this.API_URL}/${agendaId}`, agendaData);
  }
}
