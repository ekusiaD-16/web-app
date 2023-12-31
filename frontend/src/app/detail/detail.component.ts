import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClientService } from '../service/http-client.service';
import { CommonService } from '../service/common.service';
import { ConnectError } from '../error';
import { STATES } from '../states';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  image : any
  id : string = ''

  constructor(private acRoute : ActivatedRoute,
              private common : CommonService,
              private httpClientService : HttpClientService
    ) {
  }

  ngOnInit() {
    this.acRoute.paramMap.subscribe(params => {
      this.id = params.get('imageId')!
      const imageObservable = this.httpClientService.getImageById(this.id)
      imageObservable.subscribe(
        (data) => { console.log(data); this.image = data },
        (err)  => {
          if(err.status === 404) {
            console.error(err)
          }
          if(err.status === 500) {
            console.error(err, JSON.stringify(err.error))
          }
          if(err.status === 504) {
            console.error(new ConnectError('can not connect backend', err))
          }
        },
      )
    })
  }

  getFullPath(imagePath:string) {
    return this.common.getFullPath(imagePath)
  }

  getState(stateId:number) {
    return STATES.states[stateId]
  }

}
