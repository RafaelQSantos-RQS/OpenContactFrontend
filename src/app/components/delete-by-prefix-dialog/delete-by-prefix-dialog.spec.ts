import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteByPrefixDialog } from './delete-by-prefix-dialog';

describe('DeleteByPrefixDialog', () => {
  let component: DeleteByPrefixDialog;
  let fixture: ComponentFixture<DeleteByPrefixDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteByPrefixDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteByPrefixDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
