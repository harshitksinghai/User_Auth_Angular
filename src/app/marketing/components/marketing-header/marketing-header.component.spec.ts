import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingHeaderComponent } from './marketing-header.component';

describe('MarketingHeaderComponent', () => {
  let component: MarketingHeaderComponent;
  let fixture: ComponentFixture<MarketingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
