import { Component, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { ConnectError, InvalidError } from '../error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  @Input()
  imageId : string = ''

  @Input()
  imageName : string = ''

  constructor(private httpCientService : HttpClientService,
              private router : Router
    ) { }

  onClickDelete(event:any) {
    if(this.imageId) {
      const imageJson = { 'imageId' : this.imageId }
      const deleteObservable = this.httpCientService.deleteImage(imageJson)
      deleteObservable.subscribe(
        (data) => { this.router.navigate(['list']) },
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
      console.error(new InvalidError('imageId is null',Error()))
    }
  }

}
