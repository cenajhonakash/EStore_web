import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagerDashComponent } from './store-manager-dash.component';

describe('StoreManagerDashComponent', () => {
  let component: StoreManagerDashComponent;
  let fixture: ComponentFixture<StoreManagerDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreManagerDashComponent]
    });
    fixture = TestBed.createComponent(StoreManagerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
