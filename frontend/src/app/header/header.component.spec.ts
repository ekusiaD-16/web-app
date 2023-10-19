import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';
import { ImgUploadComponent } from '../img-upload/img-upload.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;

  @Component({
    selector: 'app-img-upload',
    template: 'stub'
  })
  class StubImgUploadComponent {}

  @Component({
    template:`stub`
  })
  class StubListComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [ { path: 'list', component: StubListComponent } ]
        ),
      ],
      declarations: [
        HeaderComponent,
        StubImgUploadComponent,
       ],
       providers: [
        { provide: ImgUploadComponent, useValue: StubImgUploadComponent }
       ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  test('constructor', () => {
    expect(component).toBeTruthy();
  });

  test('shoud have elements', () => {
    const elements = fixture.nativeElement;
    expect(elements.textContent).toContain('File');
    expect(elements.textContent).toContain('Upload');
    expect(elements.textContent).toContain('List');
  });

  test('should have link to list', () => {
    const listLink = fixture.nativeElement.querySelector('.list');
    expect(listLink.textContent).toContain('List');

    expect(location.path()).toBe('');
    listLink.click();
    expect(location.path()).toBe('/list');
  });

  test('should have link to upload', () => {
    const uploadLink = fixture.nativeElement.querySelector('.upload');
    expect(uploadLink.textContent).toContain('Upload');

    uploadLink.click();
    const modal = fixture.nativeElement.querySelector('#uploadModal');
    expect(modal).toBeTruthy();
    const imgUploadComponent = TestBed.get(ImgUploadComponent);
    expect(imgUploadComponent).toBeTruthy();
  });

});
