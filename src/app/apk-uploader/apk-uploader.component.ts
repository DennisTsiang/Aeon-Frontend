import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { uploadResponse } from '../model/entities';

@Component({
  selector: 'app-apk-uploader',
  templateUrl: './apk-uploader.component.html',
  styleUrls: ['./apk-uploader.component.css']
})
export class ApkUploaderComponent implements OnInit {

  private readonly HOSTNAME = "http://localhost:8081";

  @Output()
  public filename: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public get dropzoneConfig(): DropzoneConfigInterface {
    const dropzoneConfig: DropzoneConfigInterface = {
      url: this.HOSTNAME + '/file-upload/apk',
      maxFiles: 1,
      acceptedFiles: '.apk'
    };
    return dropzoneConfig;
  }

  public onUploadSuccess(event: any): void {
    //Retrieve server response from event
    const serverResponse: uploadResponse = event[1];
    console.log(serverResponse.filename);
    this.filename.emit(serverResponse.filename);
  }
}
