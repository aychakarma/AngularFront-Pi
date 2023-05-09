import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackproduitComponent } from './backproduit.component';

describe('BackproduitComponent', () => {
  let component: BackproduitComponent;
  let fixture: ComponentFixture<BackproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
