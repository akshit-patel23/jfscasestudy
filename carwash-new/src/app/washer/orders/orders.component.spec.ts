import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasherOrdersComponent } from './orders.component';

describe('WasherOrdersComponent', () => {
  let component: WasherOrdersComponent;
  let fixture: ComponentFixture<WasherOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasherOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasherOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
