import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Image } from '../Image';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  host : string = 'http://localhost:4200/app'

  // images : Image[] = []
  // image : Image = new Image('_id','name','path','state','_v')

  constructor(private httpClient : HttpClient) { }

  // getImages(callback : any) {
  //   return this.httpClient.get(this.host + '/api/v1/images')
  //   .subscribe(
  //     (res) => {
  //       const response : any = res
  //       callback(response)
  //     },
  //     (error) => {
  //       console.log(error)
  //     }
  //   )
  // }

  getImages() : Observable<any> {
    return this.httpClient.get(this.host + '/api/v1/images')
  }

  getImageById(imageId:string) {
    return this.httpClient.get(this.host + '/api/v1/images/' + imageId)
  }

}
