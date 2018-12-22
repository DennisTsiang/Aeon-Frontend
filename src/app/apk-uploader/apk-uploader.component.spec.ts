import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApkUploaderComponent } from './apk-uploader.component';

describe('ApkUploaderComponent', () => {
  let component: ApkUploaderComponent;
  let fixture: ComponentFixture<ApkUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApkUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApkUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
