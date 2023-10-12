import { Component, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rotate',
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.scss']
})
export class RotateComponent {

  @Input()
  imageId : string = ''
  angle : number = 0
  message  : string = ''

  constructor(
    private httpClientService : HttpClientService,
    private routes : Router) { }

    ngOnInit(): void {
    }
  
    onClick() {
      try {
        this.message = ''
        this.angle = this.validAngle(this.angle)
        const editorJson = {
          imageId : this.imageId,
          angle: this.angle
        }
        console.log(JSON.stringify(editorJson))
        // call httpService
        const resizeObservable = this.httpClientService.sendRotate(editorJson)
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
  
    validAngle(angle:number) {
      if(angle != 0) { return angle }
      else { throw new Error("0 以外を入力してください") }
    }

}
