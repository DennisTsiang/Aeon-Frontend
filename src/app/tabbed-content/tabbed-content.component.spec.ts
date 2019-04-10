import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedContentComponent } from './tabbed-content.component';

describe('TabbedContentComponent', () => {
  let component: TabbedContentComponent;
  let fixture: ComponentFixture<TabbedContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
