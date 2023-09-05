import { Component, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trim',
  templateUrl: './trim.component.html',
  styleUrls: ['./trim.component.scss']
})
export class TrimComponent {
  
  @Input()
  imageId : string = ''

  top : number = 0
  bottom : number = 0
  left : number = 0
  right : number = 0
  message  : string = ''

  constructor(
    private httpClientService : HttpClientService,
    private routes : Router) { }

  ngOnInit(): void {
  }

  onClick() {
    try {
      this.message = ''
      const result = this.validPos(this.top,this.bottom,this.left,this.right)
      const editorJson = {
        imageId : this.imageId,
        pos: { top:this.top, bottom:this.bottom, left:this.left, right:this.right }
      }
      console.log(JSON.stringify(editorJson))
      // call httpService
      const trimObservable = this.httpClientService.sendTrim(editorJson)
      trimObservable.subscribe(
        (data) => { this.routes.navigate(['list']) },
        (err) => { this.message = err },
      )
    }
    catch(err) {
      this.message = `${err}`
      console.error(err)
    }
  }

  validPos(top:number,bottom:number,left:number,right:number) {
    if(Number.isInteger(top) && Number.isInteger(bottom) && Number.isInteger(left) && Number.isInteger(right)) {
      if(top >= 0 && left >= 0 && top != bottom && left != right) { return true }
      else { throw new Error("invalid number") }
    }
    else { throw new Error("invalid number") }
  }
  
}
