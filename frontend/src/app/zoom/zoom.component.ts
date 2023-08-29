import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.imageId,this.zoomRate)
  }

  onClick() {
    try {
      this.message = ''
      this.zoomRate = this.validZoomRate(this.zoomRate)
      const editorJson = {
        imageId : this.imageId,
        zoomRate: this.zoomRate
      }
      console.log(JSON.stringify(editorJson))
      // call httpService
    }
    catch(err) {
      this.message = `${err}`
      console.error(err)
    }
  }

  validZoomRate(zoomRate:number) {
    if(zoomRate > 0 && zoomRate <= 1.0) { return zoomRate }
    else { throw new Error("invalid number") }
  }
}
