import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseListRequestComponent } from './purchase-list-request.component';

describe('PurchaseListRequestComponent', () => {
  let component: PurchaseListRequestComponent;
  let fixture: ComponentFixture<PurchaseListRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseListRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
