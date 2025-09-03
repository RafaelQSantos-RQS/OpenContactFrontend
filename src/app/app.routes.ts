import { Routes } from '@angular/router';
import { AgendaList } from './pages/agenda-list/agenda-list';
import { AgendaDetail } from './pages/agenda-detail/agenda-detail';

export const routes: Routes = [
  { path: '', component: AgendaList },
  { path: 'agendas/:id', component: AgendaDetail }
];
