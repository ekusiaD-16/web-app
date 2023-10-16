import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUploadComponent } from './img-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImgUploadComponent', () => {
  let component: ImgUploadComponent;
  let fixture: ComponentFixture<ImgUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ImgUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
