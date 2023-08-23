import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgExportComponent } from './img-export.component';

describe('ImgExportComponent', () => {
  let component: ImgExportComponent;
  let fixture: ComponentFixture<ImgExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
