import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { uploadResponse } from '../model/entities';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  private readonly HOSTNAME = "http://localhost:8081";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public get dropzoneConfig(): DropzoneConfigInterface {
    const dropzoneConfig: DropzoneConfigInterface = {
      url: this.HOSTNAME + '/file-upload',
      maxFiles: 1,
      acceptedFiles: '.apk'
    };
    return dropzoneConfig;
  }

  public onUploadSuccess(event: any): void {
    //Retrieve server response from event
    const serverResponse: uploadResponse = event[1];
    console.log(serverResponse.filename);
    this.sendEnergyRequest(serverResponse.filename)
      .subscribe(message => console.log(message));
  }

  private sendEnergyRequest(filename: string): Observable<string> {
    // TODO: Change responseType to JSON to get the output results
    return this.http.get(this.HOSTNAME + '/energy-eval/'+filename+'/12',
       {responseType: 'text'})
       .catch((error: any) => {
          console.log(error);
          return Observable.of("Error occured.")
       });
  }

}
