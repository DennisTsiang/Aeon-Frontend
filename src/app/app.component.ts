import { Component } from '@angular/core';
import { EnergyDataResponse, GraphData, ResultsData } from './model/entities';
declare var Chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Aeon';
  public showData = false;
  public tabs: ResultsData[] = [];
  public activeTabIndex: number = 0;

  public onData(energyDataResponses: EnergyDataResponse[]): void {
    console.log("Received energy data response");
    console.log(energyDataResponses);
    this.tabs = energyDataResponses.map(energyDataResponse => {
      let resultData: ResultsData = {} as ResultsData;
      let hardwareLabels = energyDataResponse.hardwareData
        .map(dataPair => dataPair[0]);
      let hardwareValues = energyDataResponse.hardwareData
        .map(dataPair => dataPair[1]);
      let apiLabels = energyDataResponse.apiData.map(dataPair => dataPair[0]);
      let apiValues = energyDataResponse.apiData.map(dataPair => dataPair[1]);
      let totalEnergy = hardwareValues.reduce((x,y) => x+y) +
        apiValues.reduce((x,y) => x+y);
      resultData.truncatedTotalEnergy = totalEnergy.toFixed(7);
      resultData.hardwareData = { labels: hardwareLabels, values: hardwareValues };
      resultData.apiData = { labels: apiLabels, values: apiValues };
      resultData.rating = energyDataResponse.rating;
      resultData.ratingClass = "rating-" + resultData.rating;
      resultData.percentile = energyDataResponse.percentile;
      resultData.levelIndicator = parseFloat(resultData.percentile) <= 50 ? "top" : "bottom";
      resultData.statementCoverage = energyDataResponse.statementCoverage == null ?
        "N/A":
        parseFloat(energyDataResponse
        .statementCoverage)
        .toFixed(2);
      resultData.reportFilename = energyDataResponse.reportFilename;
      return resultData;
    });
    this.showData = true;
    setTimeout(() => document.getElementById("coverage")
      .scrollIntoView({behavior: 'smooth', block: "end"})
    , 1000);
  }

  public onHideData() {
    this.showData = false;
  }

  public onSwitchTab(index: number): void {
    this.activeTabIndex = index;
  }

  public isActiveTab(index: number): boolean {
    return this.activeTabIndex == index;
  }

}
