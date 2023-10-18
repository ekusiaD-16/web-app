import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToGrayComponent } from './to-gray.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('ToGrayComponent', () => {
  let component: ToGrayComponent;
  let fixture: ComponentFixture<ToGrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
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
