import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  host : string = 'http://localhost:4200/app'

  constructor(private httpClient : HttpClient) { }

  getImages(callback : any) {
    return this.httpClient.get(this.host + '/api/v1/images')
    .subscribe(
      (res) => {
        const response : any = res
        callback(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
