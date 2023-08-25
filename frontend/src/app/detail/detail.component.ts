import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { images } from '../images';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  image : any
  name : string = ''

  constructor(private acRoute : ActivatedRoute) {
  }

  ngOnInit() {
    this.acRoute.paramMap.subscribe(params => {
      this.name = params.get('imageId')!
      images.forEach(image => {
        if(image.name == this.name) {
          this.image = image
        }
      })
    })
  }

}
