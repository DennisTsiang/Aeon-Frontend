import { Component } from '@angular/core';
import { EnergyDataResponse, GraphData } from './model/entities';
declare var Chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Aeon';
  public showData = false;
  public hardwareData: GraphData = null;
  public apiData: GraphData = null;
  public rating: string = null;

  public onData(energyDataResponse: EnergyDataResponse): void {
    console.log("Received energy data response");
    console.log(energyDataResponse);
    let hardwareLabels = energyDataResponse.hardwareData
      .map(dataPair => dataPair[0]);
    let hardwareValues = energyDataResponse.hardwareData
      .map(dataPair => dataPair[1]);
    let apiLabels = energyDataResponse.apiData.map(dataPair => dataPair[0]);
    let apiValues = energyDataResponse.apiData.map(dataPair => dataPair[1]);
    this.hardwareData = { labels: hardwareLabels, values: hardwareValues };
    this.apiData = { labels: apiLabels, values: apiValues };
    this.rating = energyDataResponse.rating;
    this.showData = true;
    setTimeout(() => document.getElementById("rating")
      .scrollIntoView({behavior: 'smooth', block: "end"})
    , 1000);
  }

  public onHideData() {
    this.showData = false;
  }

}
