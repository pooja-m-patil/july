import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicetypeComponent } from './devicetype.component';

describe('DevicetypeComponent', () => {
  let component: DevicetypeComponent;
  let fixture: ComponentFixture<DevicetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
