import { Component, OnInit, Input } from '@angular/core';
import { ResultsData, GraphData } from '../model/entities';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input()
  public resultsData: ResultsData = {} as ResultsData;

  constructor() { }

  ngOnInit() {
  }

}
