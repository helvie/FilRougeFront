import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraSessionsComponent } from './intra-sessions.component';

describe('IntraSessionsComponent', () => {
  let component: IntraSessionsComponent;
  let fixture: ComponentFixture<IntraSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntraSessionsComponent]
    });
    fixture = TestBed.createComponent(IntraSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
