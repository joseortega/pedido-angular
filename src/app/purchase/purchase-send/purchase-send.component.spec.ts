import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSendComponent } from './purchase-send.component';

describe('PurchaseSendComponent', () => {
  let component: PurchaseSendComponent;
  let fixture: ComponentFixture<PurchaseSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
