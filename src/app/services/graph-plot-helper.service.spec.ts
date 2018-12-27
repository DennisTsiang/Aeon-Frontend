import { TestBed, inject } from '@angular/core/testing';

import { GraphPlotHelperService } from './graph-plot-helper.service';

describe('GraphPlotHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphPlotHelperService]
    });
  });

  it('should be created', inject([GraphPlotHelperService], (service: GraphPlotHelperService) => {
    expect(service).toBeTruthy();
  }));
});
