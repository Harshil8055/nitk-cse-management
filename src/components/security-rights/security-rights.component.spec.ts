import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRightsComponent } from './security-rights.component';

describe('SecurityRightsComponent', () => {
  let component: SecurityRightsComponent;
  let fixture: ComponentFixture<SecurityRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
