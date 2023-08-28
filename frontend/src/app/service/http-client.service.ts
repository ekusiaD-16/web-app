import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  host : string = 'http://localhost:4200/app'

  constructor(private httpClient : HttpClient) { }

  getImages() : Observable<any> {
    return this.httpClient.get(this.host + '/api/v1/images')
  }

  getImageById(imageId:string) {
    return this.httpClient.get(this.host + '/api/v1/images/' + imageId)
  }

}
