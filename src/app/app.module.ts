import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { UploaderComponent } from './uploader/uploader.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import { GraphPlotHelperService } from './services/graph-plot-helper.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropzoneUploaderComponent } from './dropzone-uploader/dropzone-uploader.component'

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    PieChartComponent,
    SpinnerComponent,
    DropzoneUploaderComponent
  ],
  imports: [
    BrowserModule,
    DropzoneModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    ChartsModule,
    FormsModule,
  ],
  providers: [
    GraphPlotHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
