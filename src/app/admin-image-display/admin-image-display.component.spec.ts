import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageDisplayComponent } from './admin-image-display.component';

describe('AdminImageDisplayComponent', () => {
  let component: AdminImageDisplayComponent;
  let fixture: ComponentFixture<AdminImageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminImageDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
