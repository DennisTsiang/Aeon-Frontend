import {
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface 
} from 'ngx-dropzone-wrapper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import { UploadResponse } from '../model/entities';

@Component({
  selector: 'app-dropzone-uploader',
  templateUrl: './dropzone-uploader.component.html',
  styleUrls: ['./dropzone-uploader.component.css']
})
export class DropzoneUploaderComponent implements OnInit {

  @Input()
  public hostname: string = null;

  @Input()
  public path: string = null;

  @Input()
  public message: string = null;

  @Input()
  public ext: string = null;

  @Input()
  public clear: Subject<boolean>;

  @Output()
  public filename: EventEmitter<string> = new EventEmitter();

  @ViewChild(DropzoneComponent) dropzoneComponent?: DropzoneComponent;

  constructor() { }

  public ngOnInit() {
    this.clear.subscribe(clear => {
      console.log("Received clear signal");
      if (this.dropzoneComponent
          && this.dropzoneComponent.directiveRef) {
            this.dropzoneComponent.directiveRef.reset();
      }
    });
  }

  public get dropzoneConfig(): DropzoneConfigInterface {
    const dropzoneConfig: DropzoneConfigInterface = {
      url: this.hostname + this.path,
      maxFiles: 1,
      acceptedFiles: this.ext
    };
    return dropzoneConfig;
  }

  public onUploadSuccess(event: any): void {
    //Retrieve server response from event
    const serverResponse: UploadResponse = event[1];
    console.log(serverResponse.filename);
    this.filename.emit(serverResponse.filename);
  }

}
