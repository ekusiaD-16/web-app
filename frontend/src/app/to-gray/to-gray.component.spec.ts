import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToGrayComponent } from './to-gray.component';

describe('ToGrayComponent', () => {
  let component: ToGrayComponent;
  let fixture: ComponentFixture<ToGrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToGrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToGrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
