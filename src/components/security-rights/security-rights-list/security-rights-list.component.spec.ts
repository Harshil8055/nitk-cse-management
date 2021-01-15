import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRightsListComponent } from './security-rights-list.component';

describe('SecurityRightsListComponent', () => {
  let component: SecurityRightsListComponent;
  let fixture: ComponentFixture<SecurityRightsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRightsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityRightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
