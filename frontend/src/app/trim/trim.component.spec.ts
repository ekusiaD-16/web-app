import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimComponent } from './trim.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('TrimComponent', () => {
  let component: TrimComponent;
  let fixture: ComponentFixture<TrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
      ],
      declarations: [ TrimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
