import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDonwloadComponent } from './img-donwload.component';

describe('ImgDonwloadComponent', () => {
  let component: ImgDonwloadComponent;
  let fixture: ComponentFixture<ImgDonwloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgDonwloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgDonwloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
