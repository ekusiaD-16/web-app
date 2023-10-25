import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientService } from './http-client.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [ HttpClientService ],
    });
    service = TestBed.inject(HttpClientService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  test('constructor', () => {
    expect(service).toBeTruthy();
  });

  describe('getImages()', () => {
    test('getImages() can get Images', async () => {
      // ダミーデータ
      const expected = [
        { _id: 'aaa', name: 'testA', state: 0, src: 'data:image/png;base64,iVBORw0K...' },
        { _id: 'bbb', name: 'testB', state: 0, src: 'data:image/png;base64,ghmaklhh...' },
      ];
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.getImages().toPromise();

      const req = httpTestingController.expectOne('/api/v1/images/');
      expect(req.request.method).toBe('GET');
      req.flush(expected);

      const res = await promise;
      expect(res).toEqual(expected);
    });

    test('getImages() can get null list', async () => {
      // ダミーデータ
      const expected:Array<null> = []
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.getImages().toPromise();

      const req = httpTestingController.expectOne('/api/v1/images/');
      expect(req.request.method).toBe('GET');
      req.flush(expected);

      const res = await promise;
      expect(res).toEqual([]);
    });

    test('getImages() can get error', async () => {
      // ダミーデータ
      const error : Error = new Error('Not Found')
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.getImages().toPromise();

      const req = httpTestingController.expectOne('/api/v1/images/');
      expect(req.request.method).toBe('GET');
      req.flush(error);

      const res = await promise;
      expect(res).toEqual(error);
    });

  });

  describe('getImageById()', () => {
    test('getImageById() can get Image', async () => {
      // ダミーデータ
      const expected = [
        { _id: 'aaa', name: 'testA', state: 0, src: 'data:image/png;base64,iVBORw0K...' },
        { _id: 'bbb', name: 'testB', state: 0, src: 'data:image/png;base64,ghmaklhh...' },
      ];
      const targetId = 'aaa'
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.getImageById(targetId).toPromise();

      const req = httpTestingController.expectOne('/api/v1/images/' + targetId );
      expect(req.request.method).toBe('GET');
      req.flush(expected[0]);

      const res = await promise;
      expect(res).toEqual(expected[0]);
    });

    test('getImageById() can not get non register image', async () =>{
      // ダミーデータ
      const expected = [
        { _id: 'aaa', name: 'testA', state: 0, src: 'data:image/png;base64,iVBORw0K...' },
        { _id: 'bbb', name: 'testB', state: 0, src: 'data:image/png;base64,ghmaklhh...' },
      ];
      const targetId = 'cccccc'
      const error : Error = new Error('Not Found')
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.getImageById(targetId).toPromise();

      const req = httpTestingController.expectOne('/api/v1/images/' + targetId );
      expect(req.request.method).toBe('GET');
      req.flush(error);

      const res = await promise;
      expect(res).toEqual(error);
    });

    test('getImageById() can get other error', async () => {
      // ダミーデータ
      const targetId = 'aaa'
      const error : Error = new Error('Some error')
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.getImageById(targetId).toPromise();

      const req = httpTestingController.expectOne('/api/v1/images/' + targetId);
      expect(req.request.method).toBe('GET');
      req.flush(error);

      const res = await promise;
      expect(res).toEqual(error);
    });

  });
  
  describe('sendImage()', () => {
    test('sendImage() can send Image', async () => {
      // ダミーデータ
      const imageJson = {
        _id: 'aaa',
        name: 'testA',
        state: 0,
        src: 'data:image/png;base64,iVBORw0K...'
       }
       const result = {'result':true}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendImage(imageJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/register/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

    test('sendImage() can not send Image', async () => {
      // ダミーデータ
      const imageJson = {
        _id: 'aaa',
        name: 'testA',
        state: 0,
        src: 'data:image/png;base64,iVBORw0K...'
       }
       const result = {'result':false}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendImage(imageJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/register/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

  });

  describe('deleteImage()', () => {
    test('deleteImage() can delete Image', async () => {
      // ダミーデータ
      const imageJson = { imageId: 'aaa' }
       const result = {'result':true}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.deleteImage(imageJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/delete/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

    test('deleteImage() can not delete Image', async () => {
      // ダミーデータ
      const imageJson = { imageId: 'aaa' }
       const result = {'result':false}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.deleteImage(imageJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/delete/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

  });

  describe('sendResize()', () => {
    test('sendResize() can send editor resize()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa', resizeRate: 0.1 }
       const result = {'result':true}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendResize(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/resize/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

    test('sendResize() can not send editor resize()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa', resizeRate: 0.1 }
       const result = {'result':false}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendResize(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/resize/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

  });

  describe('sendRotate()', () => {
    test('sendRotate() can send editor Rotate()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa', angle: 60 }
       const result = {'result':true}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendRotate(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/rotate/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

    test('sendResize() can not send editor Rotate()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa', angle: 60 }
       const result = {'result':false}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendRotate(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/rotate/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });
    
  });

  describe('sendToGray()', () => {
    test('sendToGray() can send editor toGray()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa' }
       const result = {'result':true}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendToGray(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/toGray/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

    test('sendToGray() can not send editor toGray()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa' }
       const result = {'result':false}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendToGray(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/toGray/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });
  });

  xdescribe('sendTrim()', () => {
    test('sendTrim() can send editor Trim()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa', pos: { top:100, bottom:200, left:0, right:100 } }
       const result = {'result':true}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendTrim(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/trim/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });

    test('sendTrim() can not send editor Trim()', async () => {
      // ダミーデータ
      const editorJson = { imageId: 'aaa', pos: { top:100, bottom:200, left:0, right:100 } }
       const result = {'result':false}
      // promise化して、確実にResponseが返ってくることを保証する
      const promise = service.sendTrim(editorJson).toPromise();

      const req = httpTestingController.expectOne('/api/v1/editor/trim/');
      expect(req.request.method).toBe('POST');
      req.flush(result);

      const res = await promise;
      expect(res).toEqual(result);
    });
  });

});
