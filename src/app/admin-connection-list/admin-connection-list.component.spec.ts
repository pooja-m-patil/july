import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConnectionListComponent } from './admin-connection-list.component';

describe('AdminConnectionListComponent', () => {
  let component: AdminConnectionListComponent;
  let fixture: ComponentFixture<AdminConnectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConnectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConnectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
