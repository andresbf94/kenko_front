import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDelayComponent } from './tooltip-delay.component';

describe('TooltipDelayComponent', () => {
  let component: TooltipDelayComponent;
  let fixture: ComponentFixture<TooltipDelayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDelayComponent]
    });
    fixture = TestBed.createComponent(TooltipDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
