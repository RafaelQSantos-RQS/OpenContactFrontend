import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAgendaDialog } from './create-edit-agenda-dialog';

describe('CreateEditAgendaDialog', () => {
  let component: CreateEditAgendaDialog;
  let fixture: ComponentFixture<CreateEditAgendaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditAgendaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditAgendaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
