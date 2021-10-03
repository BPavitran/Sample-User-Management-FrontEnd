import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDataUploadComponent } from './excel-data-upload.component';

describe('ExcelDataUploadComponent', () => {
  let component: ExcelDataUploadComponent;
  let fixture: ComponentFixture<ExcelDataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDataUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
