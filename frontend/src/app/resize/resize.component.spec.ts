import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ResizeComponent } from './resize.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientService } from '../service/http-client.service';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

describe('ResizeComponent', () => {
  let component: ResizeComponent;
  let fixture: ComponentFixture<ResizeComponent>;
  let location: Location;

  @Component({
    template:`stub`
  })
  class StubListComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [ { path: 'list', component: StubListComponent } ]
        ),
        FormsModule,
      ],
      declarations: [ ResizeComponent ],
      providers: [
        HttpClientService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.get(Location);
    });

  test('constructor', () => {
    expect(component).toBeTruthy();
  });

  test('should have input', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  test('should have excute button', () => {
    const elements = fixture.nativeElement.querySelector('button');
    expect(elements.textContent).toContain('excute')
  });

  test('should not have error message', () => {
    // 初期状態 error messageなし
    const normal_message = fixture.nativeElement.querySelector('p');
    expect(normal_message).toBeFalsy();
  });

  test('#正常系 messageが出ず、/listへredirectする', fakeAsync( () => {
    // httpClientService.sendResize()をmock
    const httpClientService = TestBed.inject(HttpClientService);
    jest.spyOn(httpClientService,'sendResize').mockImplementation( (editorJson:object) => {
      return new Observable(observer => { observer.next({'result':true}) })
    })
    // 正常時 入力
    component.imageId = '652f47086056dec9bd72b4d5';
    component.resizeRate = 0.5;
    // excute button click
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    tick();
    // message=='' path=='/list'
    expect(component.message).toBe('')
    expect(location.path()).toBe('/list')
  }));

  test('#異常系(resizeRate=0) 入力値が事前チェックに落ちる', fakeAsync( () => {
    // 異常時 入力
    component.imageId = '652f47086056dec9bd72b4d5';
    component.resizeRate = 0;
    // excute button click
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    tick();
    // message=='Error: invalid number'
    expect(component.message).toBe('Error: invalid number');
  }));

  test('#異常系 httpClientServiceからerrorが返ってくる', fakeAsync( () => {
    // httpClientService.sendResize()をmock errorを返す
    const httpClientService = TestBed.inject(HttpClientService);
    const error = new Error('httpClientServiceError')
    jest.spyOn(httpClientService,'sendResize').mockImplementation( (editorJson:object) => {
      return new Observable(observer => { observer.error(error) })
    })
    // 正常時 入力
    component.imageId = '652f47086056dec9bd72b4d5';
    component.resizeRate = 0.5;
    // excute button click
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    tick();
    // message=='httpClientServiceError'
    expect(component.message).toBe('Error: httpClientServiceError');
  }));

});
