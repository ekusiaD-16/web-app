import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient) { }

  getImages() : Observable<any> {
    return this.httpClient.get('/api/v1/images/')
  }

  getImageById(imageId:string) : Observable<any> {
    return this.httpClient.get('/api/v1/images/' + imageId)
  }

  sendImage(imageJson:object) : Observable<any> {
    return this.httpClient.post('/api/v1/register/', imageJson)
  }

  deleteImage(imageJson:object) : Observable<any> {
    return this.httpClient.post('/api/v1/delete/', imageJson)
  }

  sendResize(editorJson:object) : Observable<any> {
    return this.httpClient.post('/api/v1/editor/resize/', editorJson)
  }

  sendRotate(editorJson:object) : Observable<any> {
    return this.httpClient.post('/api/v1/editor/rotate/', editorJson)
  }

  sendToGray(editorJson:object) : Observable<any> {
    return this.httpClient.post('/api/v1/editor/toGray/', editorJson)
  }

  sendTrim(editorJson:object) : Observable<any> {
    return this.httpClient.post('/api/v1/editor/trim/', editorJson)
  }

}
