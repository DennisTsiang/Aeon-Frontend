import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { ApkUploaderComponent } from './apk-uploader/apk-uploader.component';
import { ScriptUploaderComponent } from './script-uploader/script-uploader.component';
import { UploaderComponent } from './uploader/uploader.component';


@NgModule({
  declarations: [
    AppComponent,
    ApkUploaderComponent,
    ScriptUploaderComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    DropzoneModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
