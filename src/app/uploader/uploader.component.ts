import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { EnergyDataResponse } from '../model/entities';

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
      .subscribe((message: EnergyDataResponse) => console.log(message));
  }

  private sendEnergyRequest(): Observable<EnergyDataResponse> {
    return this.http.get<EnergyDataResponse>(this.HOSTNAME + '/energy-eval/' + this.filename + '/'
      + this.scriptname)
        .catch((error: any) => {
          console.log(error);
          return Observable.of({
              hardwareData: null,
              apiData: null
          })
        });
  }

  public isDisabled(): boolean {
    return this.filename == "" || this.scriptname == "";
  }

}
