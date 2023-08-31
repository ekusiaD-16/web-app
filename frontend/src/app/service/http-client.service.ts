import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient) { }

  getImages() : Observable<any> {
    return this.httpClient.get('/api/v1/images')
  }

  getImageById(imageId:string) {
    return this.httpClient.get('/api/v1/images/' + imageId)
  }

  sendImage(imageJson:object) {
    return this.httpClient.post('/api/v1/register/', imageJson)
  }

  deleteImage(imageJson:object) {
    return this.httpClient.post('api/v1/delete', imageJson)
  }

  sendZoom(editorJson:object) {
    return this.httpClient.post('/api/v1/editor/zoom/', editorJson)
  }

}
