import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { EnergyDataResponse } from '../model/entities';

@Component({
  selector: 'app-tabbed-content',
  templateUrl: './tabbed-content.component.html',
  styleUrls: ['./tabbed-content.component.css']
})
export class TabbedContentComponent implements OnInit {

  @Input()
  public tabHeaders: string[] = [];

  @Output()
  public switchTabEvent: EventEmitter<number> = new EventEmitter();


  private activeTabIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

  public switchTab(event, index): void {
    this.activeTabIndex = index;
    this.switchTabEvent.emit(index);
  }

  public isActive(index): boolean {
    return index == this.activeTabIndex;
  }

}
