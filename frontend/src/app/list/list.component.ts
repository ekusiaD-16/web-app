import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';

import { Image } from '../Image'
import { CommonService } from '../service/common.service';
import { ConnectError } from '../error'
import { HttpErrorResponse } from '@angular/common/http';
import { STATES } from '../states'

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
      (err)  => {
        if(err.status === 500) {
          console.error(err, JSON.stringify(err.error))
        }
        if(err.status === 504) {
          console.error(new ConnectError('can not connect backend', err))
        }
      }
    )
  }

  getFullPath(imagePath:string) {
    return this.common.getFullPath(imagePath)
  }

  getState(stateId:number) {
    return STATES.states[stateId]
  }

}
