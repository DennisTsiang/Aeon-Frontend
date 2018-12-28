import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { ApkUploaderComponent } from './apk-uploader/apk-uploader.component';
import { ScriptUploaderComponent } from './script-uploader/script-uploader.component';
import { UploaderComponent } from './uploader/uploader.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import { GraphPlotHelperService } from './services/graph-plot-helper.service'

@NgModule({
  declarations: [
    AppComponent,
    ApkUploaderComponent,
    ScriptUploaderComponent,
    UploaderComponent,
    PieChartComponent
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
