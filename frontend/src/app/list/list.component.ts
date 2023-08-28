import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';

import { Image } from '../Image'
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  images : Image[] = []

  constructor(
    private httpClientServise : HttpClientService,
    private common : CommonService,
    ) {}

  ngOnInit(): void {
    const imagesObservable = this.httpClientServise.getImages()
    imagesObservable.subscribe(
      (data) => { this.images = data },
      (err)  => { console.error('error = ' + err) }
    )
  }

  getFullPath(imagePath:string) {
    return this.common.getFullPath(imagePath)
  }

}
