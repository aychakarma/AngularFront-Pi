import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcommandeComponent } from './backcommande.component';

describe('BackcommandeComponent', () => {
  let component: BackcommandeComponent;
  let fixture: ComponentFixture<BackcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackcommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
