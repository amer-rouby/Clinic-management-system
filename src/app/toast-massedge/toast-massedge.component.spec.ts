import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMassedgeComponent } from './toast-massedge.component';

describe('ToastMassedgeComponent', () => {
  let component: ToastMassedgeComponent;
  let fixture: ComponentFixture<ToastMassedgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastMassedgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastMassedgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
