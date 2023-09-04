import { Component, OnInit, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.scss']
})
export class resizeComponent implements OnInit {

  @Input()
  imageId : string = ''
  resizeRate : number = 0
  message  : string = ''

  constructor(
    private httpClientService : HttpClientService,
    private routes : Router) { }

  ngOnInit(): void {
  }

  onClick() {
    try {
      this.message = ''
      this.resizeRate = this.validresizeRate(this.resizeRate)
      const editorJson = {
        imageId : this.imageId,
        resizeRate: this.resizeRate
      }
      console.log(JSON.stringify(editorJson))
      // call httpService
      const resizeObservable = this.httpClientService.sendResize(editorJson)
      resizeObservable.subscribe(
        (data) => { this.routes.navigate(['list']) },
        (err) => { this.message = err },
      )
    }
    catch(err) {
      this.message = `${err}`
      console.error(err)
    }
  }

  validresizeRate(resizeRate:number) {
    if(resizeRate > 0) { return resizeRate }
    else { throw new Error("invalid number") }
  }
}
