import { Component, OnInit, Input } from '@angular/core';
import { ResultsData, GraphData } from '../model/entities';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  @Input()
  public resultsData: ResultsData = {} as ResultsData;

  @Input()
  public HOSTNAME = "";

  constructor() { }

  public hasCoverage(): boolean {
    return this.resultsData.reportFilename != null;
  }

  public reportLink(): string {
    if (!this.hasCoverage()) {
      return "";
    }

    return this.HOSTNAME+"/reports/"+this.resultsData.reportFilename;
  }

  public hasSourcelineFeedback(): boolean {
    return this.resultsData.sourcelineFeedbackFilename != null;
  }

  public sourcelineFeedbackLink(): string {
    if (!this.hasSourcelineFeedback()) {
      return "";
    }
    return this.HOSTNAME+"/sourcelinefeedback/"+this.resultsData.sourcelineFeedbackFilename;
  }

  public hasRuntime() {
    return this.resultsData.runtime != null;
  }

}
