import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingDevicesComponent } from './mapping-devices.component';

describe('MappingDevicesComponent', () => {
  let component: MappingDevicesComponent;
  let fixture: ComponentFixture<MappingDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
