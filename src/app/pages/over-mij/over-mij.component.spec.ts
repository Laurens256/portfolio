import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverMijComponent } from './over-mij.component';

describe('OverMijComponent', () => {
  let component: OverMijComponent;
  let fixture: ComponentFixture<OverMijComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverMijComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverMijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
