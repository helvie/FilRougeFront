import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterSessionsComponent } from './inter-sessions.component';

describe('InterSessionsComponent', () => {
  let component: InterSessionsComponent;
  let fixture: ComponentFixture<InterSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterSessionsComponent]
    });
    fixture = TestBed.createComponent(InterSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
