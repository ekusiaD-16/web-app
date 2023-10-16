import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientService } from '../service/http-client.service';
import { ConnectError, InvalidError } from '../error';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent {

  file : any = null
  imageSrc : string = ''

  constructor(
    private route : Router,
    private httpClientService : HttpClientService) { }

  onChangeFileInput(event:any) {
    //fileが選択されていなければリセット
    if (event.target.files.length === 0) {
      this.file = null
      this.imageSrc = ''
      return
    }
    //ファイルの情報をfileとimgPathに保存
    const reader = new FileReader()
    this.file = event.target.files[0]
    reader.onload = () => {
      if(reader.result!==null) {
        this.imageSrc = reader.result.toString()
      }
    }
    reader.readAsDataURL(this.file)
  }

  onClickUpload(event:any) {
    if(this.validFile()) {
        const imageJson = {
          name : this.getBaseName(this.file.name),
          path : this.file.name,
          state: 'raw',
          src  : this.imageSrc,
        }
        const registerObservable =  this.httpClientService.sendImage(imageJson)
        registerObservable.subscribe(
          (data) => { window.location.reload() },
          (err)  => {
            if(err.status === 500) {
              console.error(err, JSON.stringify(err.error))
            }
            if(err.status === 504) {
              console.error(new ConnectError('can not connect backend', err))
            }
          },
        )
    }
    else {
      let msg = ''
      if(!this.file) { msg = 'Not select file' }
      else           { msg = 'This file is invalid file extension' }
      console.error(new InvalidError(msg ,Error()))
    }
    this.file = null
    this.imageSrc = ''
  }

  onClickCancel(event:any) {
    this.file = null
    this.imageSrc = ''
  }

  getBaseName(filename:string) {
    return filename.split('.').shift()
  }

  getExtensionFrom(filename:string) {
    return filename.split('.').pop() || ''
  }

  validFile() {
    if(this.file && this.imageSrc) { 
      const extension = this.getExtensionFrom(this.file.name)
      const vailidExtension = [ 'png', 'jpg', 'jpeg' ]
      return vailidExtension.includes(extension)
    } 
    else { return false }
  }

}
