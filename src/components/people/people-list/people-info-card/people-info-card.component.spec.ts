import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInfoCardComponent } from './people-info-card.component';

describe('PeopleInfoCardComponent', () => {
  let component: PeopleInfoCardComponent;
  let fixture: ComponentFixture<PeopleInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
