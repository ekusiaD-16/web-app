import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getFullPath(imagePath:string) {
    return './assets/images/' + imagePath
  }
  
}
