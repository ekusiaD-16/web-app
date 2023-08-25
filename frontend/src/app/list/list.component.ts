import { Component } from '@angular/core';

import { images } from '../images';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  images = images

  getFullPath(imagePath:string) {
    return './assets/images/' + imagePath
  }

}
