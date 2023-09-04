import { Component, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-gray',
  templateUrl: './to-gray.component.html',
  styleUrls: ['./to-gray.component.scss']
})
export class ToGrayComponent {

  @Input()
  imageId : string = ''
  message : string = ''

  constructor(
    private httpClientService : HttpClientService,
    private routes : Router
    ) {}

  onClick() {
    try {
      this.message = ''
      const editorJson = {
        imageId : this.imageId
      }
      console.log(JSON.stringify(editorJson))
      // call httpService
      const toGrayObservable = this.httpClientService.sendToGray(editorJson)
      toGrayObservable.subscribe(
        (data) => { this.routes.navigate(['list']) },
        (err) => { this.message = err },
      )
    }
    catch(err) {
      this.message = `${err}`
      console.error(err)
    }
  }

}
