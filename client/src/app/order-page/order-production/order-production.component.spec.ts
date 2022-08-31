import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductionComponent } from './order-production.component';

describe('OrderProductionComponent', () => {
  let component: OrderProductionComponent;
  let fixture: ComponentFixture<OrderProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
