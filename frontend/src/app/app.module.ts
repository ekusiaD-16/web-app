import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CanvasComponent } from './canvas/canvas.component';
import { EditorComponent } from './editor/editor.component';
import { ZoomComponent } from './zoom/zoom.component';
import { RotateComponent } from './rotate/rotate.component';
import { ImgImportComponent } from './img-import/img-import.component';
import { ImgDonwloadComponent } from './img-donwload/img-donwload.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { HttpClientService } from './service/http-client.service';
import { DeleteComponent } from './delete/delete.component';
import { ToGrayComponent } from './to-gray/to-gray.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CanvasComponent,
    EditorComponent,
    ZoomComponent,
    RotateComponent,
    ImgImportComponent,
    ImgDonwloadComponent,
    DetailComponent,
    ListComponent,
    DeleteComponent,
    ToGrayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    HttpClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
