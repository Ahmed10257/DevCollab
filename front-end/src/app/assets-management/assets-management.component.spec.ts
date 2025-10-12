import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsManagementComponent } from './assets-management.component';

describe('AssetsManagementComponent', () => {
  let component: AssetsManagementComponent;
  let fixture: ComponentFixture<AssetsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
