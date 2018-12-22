import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptUploaderComponent } from './script-uploader.component';

describe('ScriptUploaderComponent', () => {
  let component: ScriptUploaderComponent;
  let fixture: ComponentFixture<ScriptUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
