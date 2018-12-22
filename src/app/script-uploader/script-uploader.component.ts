import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { uploadResponse } from '../model/entities';

@Component({
  selector: 'app-script-uploader',
  templateUrl: './script-uploader.component.html',
  styleUrls: ['./script-uploader.component.css']
})

export class ScriptUploaderComponent implements OnInit {

  private readonly HOSTNAME = "http://localhost:8081";

  @Output()
  public scriptname: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public get dropzoneConfig(): DropzoneConfigInterface {
    const dropzoneConfig: DropzoneConfigInterface = {
      url: this.HOSTNAME + '/file-upload/monkeyrunner',
      maxFiles: 1,
      acceptedFiles: '.txt'
    };
    return dropzoneConfig;
  }

  public onUploadSuccess(event: any): void {
    //Retrieve server response from event
    const serverResponse: uploadResponse = event[1];
    console.log(serverResponse.filename);
    this.scriptname.emit(serverResponse.filename);
  }

}
