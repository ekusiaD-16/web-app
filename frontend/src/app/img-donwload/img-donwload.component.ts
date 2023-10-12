import { Component, Input } from '@angular/core';
import { InvalidError } from '../error';

@Component({
  selector: 'app-img-donwload',
  templateUrl: './img-donwload.component.html',
  styleUrls: ['./img-donwload.component.scss']
})
export class ImgDonwloadComponent {

  @Input()
  imageName : string = ''

  @Input()
  imageSrc : string = ''

  saveName : string = ''
  saveExtension : string = '.png'

  constructor() { }

  onClickDownload(event:any) {
    if(!this.imageName) {
      console.error(new InvalidError('imageName is null', Error()))
    }
    else {
      if(!this.saveName) {
        this.saveName = this.imageName
      }
      // Download処理
      this.downloadImage()
    }
  }

  downloadImage() {
    let element = document.createElement('a')
    element.href = this.imageSrc
    element.download = this.saveName + this.saveExtension
    element.target = '_blank'
    element.click()
  }

}
