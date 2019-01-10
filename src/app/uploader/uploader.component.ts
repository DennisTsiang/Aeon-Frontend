import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import { EnergyDataResponse, CSVData } from '../model/entities';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  // TODO: Change this to an input sent from root
  public readonly HOSTNAME = "http://localhost:8081";
  public filename: string = "";
  public scriptname: string = "";
  public options: string[] = [
    "News", "Gaming", "Business", "Social Media", "Lifestyle", "Productivity",
    "Photography", "Video Players & Editors"
  ];
  // Also sets default selected option to one with value of null
  public selected: string = null;
  public showLoadingIcon: boolean = false;
  public clear: Subject<boolean> = new Subject;

  @Output()
  public data: EventEmitter<EnergyDataResponse> = new EventEmitter();

  @Output()
  public hideData: EventEmitter<boolean> = new EventEmitter();

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
    this.showLoadingIcon = true;
    this.sendEnergyRequest()
      .subscribe((message: EnergyDataResponse) => {
        console.log("Emitting data");
        this.showLoadingIcon = false;
        this.data.emit(message);
      });
    //this.data.emit(this.testData());
  }

  public isDisabled(): boolean {
    return this.filename == "" || this.scriptname == ""
      || !this.selected;
  }

  public onSelectChange(selected: string): void {
    console.log(selected);
  }

  public onClearButtonClick(): void {
    this.clear.next(true);
    this.filename = "";
    this.scriptname = "";
    this.selected = null;
    this.hideData.emit(true);
  }


  private sendEnergyRequest(): Observable<EnergyDataResponse> {
    return this.http.get<EnergyDataResponse>(
      this.HOSTNAME + '/energy-eval/' + this.filename + '/'
      + this.scriptname+'/'+this.selected)
        .catch((error: any) => {
          console.log(error);
          return Observable.of(this.testData());
        });
  }

  private testData(): EnergyDataResponse {
    let hardwareDatapoints: CSVData[] = [
      ["Cell standby", 0.00123],
      ["Screen", 0.000616],
      ["Wifi", 0.000411],
      ["Idle", 0.000411]
    ];
    let apiDatapoints: CSVData[] = [
      ["Anstop$resetButtonListener.onClick",0.00518514],
      ["Anstop.onCreate",0.000226966],
      ["Anstop.readSettings",0.000113483],
      ["Clock$minhandler.<init>",0.0],
      ["Anstop.onRestoreInstanceState",0.0],
      ["Anstop.setupGesture",0.0],
      ["Clock$sechandler.<init>",0.0],
      ["Clock$hourhandler.<init>",0.0],
      ["Anstop.<init>",0.0],
      ["Clock$dsechandler.<init>",0.0],
      ["Anstop.onResume",0.0],
    ];

    return {
      hardwareData: hardwareDatapoints,
      apiData: apiDatapoints,
      rating: "A",
    };
  }

}
