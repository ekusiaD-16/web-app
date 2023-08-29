import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-img-import',
  templateUrl: './img-import.component.html',
  styleUrls: ['./img-import.component.scss']
})
export class ImgImportComponent {

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

  onClickImport(event:any) {
    if(this.file && this.imageSrc) {
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
          alert('this image already exist!')
        },
      )
    }
  }

  onClickCancel(event:any) {
    this.file = null
    this.imageSrc = ''
  }

  getBaseName (filename:string) {
    return filename.split('.').shift()
  }

}
