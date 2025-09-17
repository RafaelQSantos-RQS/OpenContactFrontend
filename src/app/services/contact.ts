import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page';

export interface Contact {
  id: string;
  name: string;
  type: 'FIXED_LINE' | 'MOBILE' | 'FAX';
  areaCode: string;
  phoneNumber: string;
}

export interface ContactCreate {
  name: string;
  type: 'FIXED_LINE' | 'MOBILE' | 'FAX';
  areaCode: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly AGENDAS_API_URL = '/api/v1/agendas';
  private readonly CONTACTS_API_URL = '/api/v1/contacts';

  getContactsByAgendaId(
    agendaId: string,
    page: number,
    size: number,
    phoneFilter?: string
  ): Observable<PageResponse<Contact>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (phoneFilter && phoneFilter.trim() !== '') {
      params = params.set('phoneContains', phoneFilter);
    }

    return this.http.get<PageResponse<Contact>>(`${this.AGENDAS_API_URL}/${agendaId}/contacts`, { params });
  }


  createContact(agendaId: string, contactData: ContactCreate): Observable<Contact> {
    return this.http.post<Contact>(`${this.AGENDAS_API_URL}/${agendaId}/contacts`, contactData);
  }

  deleteContact(contactId: string): Observable<void> {
    return this.http.delete<void>(`${this.CONTACTS_API_URL}/${contactId}`);
  }

  updateContact(contactId: string, contactData: ContactCreate): Observable<Contact> {
    return this.http.put<Contact>(`${this.CONTACTS_API_URL}/${contactId}`, contactData);
  }
}
