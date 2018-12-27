import { Injectable } from '@angular/core';
import { GraphData } from '../model/entities';

@Injectable()
export class GraphPlotHelperService {

  constructor() { }

  public thresholdData(values: number[], labels: string[],
                       minimumThreshold = 1): GraphData {
    // Assume values are already sorted in desc order
    let valuesSum: number = values.reduce((x, y) => x + y);
    let normalizedValues: number[] = values.map((x) => x * 100.0 / valuesSum);

    let thresholdIndex: number = 0;
    while (thresholdIndex < normalizedValues.length &&
           normalizedValues[thresholdIndex] > minimumThreshold) {
      thresholdIndex += 1;
    }

    const remaining: number = normalizedValues.slice(thresholdIndex)
      .reduce((x,y) => x+y, 0);
    let finalValues: number[] = normalizedValues.slice(0, thresholdIndex);
    let finalLabels: string[] = labels.slice(0, thresholdIndex);

    if (remaining > 0.1) {
      finalValues.push(remaining);
      finalLabels.push('Others');
    }
    return {values: finalValues, labels: finalLabels};
  }

}
