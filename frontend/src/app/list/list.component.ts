import { Component, OnInit } from '@angular/core';

import { images } from '../images';
import { HttpClientService } from '../service/http-client.service';

import { Image } from '../Image'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  images = images
  imagesFromBackend : Image[] = []

  constructor(private httpClientServise : HttpClientService) {}

  ngOnInit(): void {
    this.httpClientServise.getImages((response : Image[]) => {
      this.imagesFromBackend = response
      console.log(JSON.stringify(this.imagesFromBackend))
    })
  }

  getFullPath(imagePath:string) {
    return './assets/images/' + imagePath
  }

}
