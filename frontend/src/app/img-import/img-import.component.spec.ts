import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgImportComponent } from './img-import.component';

describe('ImgImportComponent', () => {
  let component: ImgImportComponent;
  let fixture: ComponentFixture<ImgImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
