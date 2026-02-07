import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashsummaryComponent } from './dashsummary.component';

describe('DashsummaryComponent', () => {
  let component: DashsummaryComponent;
  let fixture: ComponentFixture<DashsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashsummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
