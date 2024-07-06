import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterSesssionComponent } from './edit-inter-sesssion.component';

describe('EditInterSesssionComponent', () => {
  let component: EditInterSesssionComponent;
  let fixture: ComponentFixture<EditInterSesssionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInterSesssionComponent]
    });
    fixture = TestBed.createComponent(EditInterSesssionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
