import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  // TODO: Change this to an input sent from root
  private readonly HOSTNAME = "http://localhost:8081";
  public filename: string = "";
  public scriptname: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public onFilenameUpdate(filename: string): void {
   this.filename = filename;
  }

  public onScriptUpdate(scriptname: string): void {
   this.scriptname = scriptname;
  }

  public onUploadButtonClick(): void {
    this.sendEnergyRequest()
      .subscribe(message => console.log(message));
  }

  private sendEnergyRequest(): Observable<string> {
    // TODO: Change responseType to JSON to get the output results
    return this.http.get(this.HOSTNAME + '/energy-eval/' + this.filename + '/'
      + this.scriptname, {responseType: 'text'})
        .catch((error: any) => {
          console.log(error);
          return Observable.of("Error occured.")
        });
  }

  public isDisabled(): boolean {
    return this.filename == "" || this.scriptname == "";
  }

}
