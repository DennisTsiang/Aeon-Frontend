import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/interval';
import {
  EnergyEvaluationRequest,
  EnergyDataResponse,
  CSVData
} from '../model/entities';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  // TODO: Change this to an input sent from root
  public readonly HOSTNAME = "http://localhost:8081";
  public uploadRequests: EnergyEvaluationRequest[] = [];
  public additionalUploadRows: number[] = [];
  public filename: string = "";
  public scriptname: string = "";
  public specificCategories: string[] = [
    "Alarm Clocks", "Dictionary", "Reddit Browsers", "Web Browsers"
  ];
  public generalCategories: string[] = [
    "News", "Gaming", "Business", "Social Media", "Lifestyle", "Productivity",
    "Photography", "Video Players & Editors"
  ];
  public testingMethods: string[] = [
    "Monkeyrunner", "DroidMate-2"
  ];
  // Also sets default selected option to one with value of null
  public selectedCategory: string = null;
  public selectedTestingMethod: string = "DroidMate-2";
  public showLoadingIcon: boolean = false;
  public clear: Subject<boolean> = new Subject;

  @Output()
  public data: EventEmitter<EnergyDataResponse[]> = new EventEmitter();

  @Output()
  public hideData: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
    let firstUploadRow: EnergyEvaluationRequest = {} as EnergyEvaluationRequest;
    this.uploadRequests.push(firstUploadRow);
  }

  ngOnInit() {
  }

  public onFilenameUpdate(filename: string, index: number): void {
    let uploadRequest: EnergyEvaluationRequest = this.uploadRequests[index];
    uploadRequest.filename = filename;
    this.filename = filename;
  }

  public onScriptUpdate(scriptname: string, index: number): void {
    let uploadRequest: EnergyEvaluationRequest = this.uploadRequests[index];
    uploadRequest.scriptname = scriptname;
    this.scriptname = scriptname;
  }

  public onUploadButtonClick(): void {
    this.showLoadingIcon = true;
    this.sendEnergyRequest()
      .subscribe((messages: EnergyDataResponse[]) => {
        console.log("Emitting data");
        this.showLoadingIcon = false;
        this.data.emit(messages);
      });
    setTimeout(() => document.getElementById("loader")
      .scrollIntoView({behavior: 'smooth', block: "end"})
    , 500);
    //this.data.emit(this.testData());
  }

  public isDisabled(): boolean {
    return (this.filename == ""
      || !this.selectedCategory || !this.selectedTestingMethod) ||
      (this.selectedTestingMethod == 'Monkeyrunner' && !this.scriptname);
}

  public onSelectChange(selected: string): void {
    console.log(selected);
  }

  public onClearButtonClick(): void {
    this.clear.next(true);
    this.filename = "";
    this.scriptname = "";
    this.selectedCategory = null;
    this.hideData.emit(true);
  }

  public methodSelected(selection: string): boolean {
    return this.selectedTestingMethod == selection;
  }

  public addRow(): void {
    this.additionalUploadRows.push(Date.now());
    let newUploadRequest: EnergyEvaluationRequest = {} as EnergyEvaluationRequest;
    this.uploadRequests.push(newUploadRequest);
  }

  public removeRow(index): void {
    this.additionalUploadRows.splice(index, 1);
    this.uploadRequests.splice(index+1, 1);
  }

  public trackByFn(index, item) {
    return item;
  }

  private sendEnergyRequest(): Observable<EnergyDataResponse[]> {
    let energyRequests: EnergyEvaluationRequest[] = this.uploadRequests
    .filter(uploadRequest => {
      if (uploadRequest.filename == undefined) return false;
      if (this.selectedTestingMethod == 'Monkeyrunner') {
        return uploadRequest.scriptname != undefined;
      } else {
        return true;
      }
    })
    .map((uploadRequest) => {
      uploadRequest.category = this.selectedCategory;
      uploadRequest.method = this.selectedTestingMethod;
      return uploadRequest;
    });
    return this.http.post<EnergyDataResponse[]>(this.HOSTNAME + '/energy-eval/',
       energyRequests)
        .catch((error: any) => {
          console.log(error);
          console.log("Returning test data");
          return Observable.of(this.testData());
        });
  }

  private testData(): EnergyDataResponse[] {
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

    let testdata1: EnergyDataResponse = {
      hardwareData: hardwareDatapoints,
      apiData: apiDatapoints,
      rating: "A",
      percentile: "34",
    };

    let testdata2: EnergyDataResponse = {
      hardwareData: hardwareDatapoints,
      apiData: apiDatapoints,
      rating: "B",
      percentile: "45",
    };

    let results: EnergyDataResponse[] = [];
    results.push(testdata1);
    results.push(testdata2);
    return results;
  }

}
