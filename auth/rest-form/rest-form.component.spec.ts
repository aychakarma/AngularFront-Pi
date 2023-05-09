import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestFormComponent } from './rest-form.component';

describe('RestFormComponent', () => {
  let component: RestFormComponent;
  let fixture: ComponentFixture<RestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
