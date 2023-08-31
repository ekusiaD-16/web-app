import { Component, OnInit, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';
import { ConnectError, InvalidError } from '../error';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  @Input()
  imageId : string = ''
  zoomRate : number = 0
  message  : string = ''

  constructor(
    private httpClientService : HttpClientService,
    private routes : Router) { }

  ngOnInit(): void {
  }

  onClick() {
    try {
      this.message = ''
      this.zoomRate = this.validZoomRate(this.zoomRate)
      const editorJson = {
        imageId : this.imageId,
        zoomRate: this.zoomRate
      }
      // call httpClientService
      const zoomObservable = this.httpClientService.sendZoom(editorJson)
      zoomObservable.subscribe(
        (data) => { this.routes.navigate(['list']) },
        (err)  => {
          const connectError = new ConnectError('Can not connect backend', err)
          this.message = connectError.message
        },
      )
    }
    catch(err) {
      this.message = `${err}`
      // console.error(err)
    }
  }

  validZoomRate(zoomRate:number) {
    if(zoomRate > 0) { return zoomRate }
    else { throw new InvalidError("invalid number", Error()) }
  }
}
