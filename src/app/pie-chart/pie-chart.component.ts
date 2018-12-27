import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { GraphData } from '../model/entities';
import { GraphPlotHelperService } from '../services/graph-plot-helper.service';
import 'chart.js';
declare var Chart: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input()
  public data: GraphData = null;

  @Input()
  public title: string = "";

  private _data: GraphData = null;

  @ViewChild('pieChartCanvas')
  pieChartCanvas: ElementRef;

  constructor(
    private element: ElementRef,
    private graphPlotHelperService: GraphPlotHelperService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chartjs();
  }

  ngOnChanges(changes: SimpleChanges) {
    let dataChange: SimpleChange = changes.data;
    if (dataChange) {
      let currentData: GraphData = dataChange.currentValue;
      let currentValues = currentData.values;
      this._data = this.graphPlotHelperService.thresholdData(currentValues,
        currentData.labels);
    }
  }

  private chartjs():void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> this.pieChartCanvas.nativeElement;
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext('2d');
    let pieData = {
      datasets: [{
        data: this.graphData().values,
        backgroundColor: [
          this.pieChartColours().red,
          this.pieChartColours().orange,
          this.pieChartColours().yellow,
          this.pieChartColours().green,
          this.pieChartColours().blue,
        ],
      }],
      labels: this.graphData().labels,
    };
    const chart: Chart = new Chart(ctx, {
      type: 'pie',
      data: pieData,
      options: {
        title: {
          text: this.title,
          display: true,
        }
      },
    });
  }

  private graphData(): GraphData {
    let defaultData: GraphData = {
      labels: [],
      values: []
    };
    if (this._data) {
      return this._data;
    } 
    return defaultData;
  }

  private pieChartColours(): { [key:string]: string } {
    return {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };
  }

}
