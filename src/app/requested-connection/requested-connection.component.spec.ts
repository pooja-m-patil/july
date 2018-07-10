import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedConnectionComponent } from './requested-connection.component';

describe('RequestedConnectionComponent', () => {
  let component: RequestedConnectionComponent;
  let fixture: ComponentFixture<RequestedConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
