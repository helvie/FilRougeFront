import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntraSesssionComponent } from './edit-intra-sesssion.component';

describe('EditIntraSesssionComponent', () => {
  let component: EditIntraSesssionComponent;
  let fixture: ComponentFixture<EditIntraSesssionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIntraSesssionComponent]
    });
    fixture = TestBed.createComponent(EditIntraSesssionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
