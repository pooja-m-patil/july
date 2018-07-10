import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrivedataComponent } from './retrivedata.component';

describe('RetrivedataComponent', () => {
  let component: RetrivedataComponent;
  let fixture: ComponentFixture<RetrivedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrivedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrivedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
