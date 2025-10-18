import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManufacturersModelsComponent } from './manage-manufacturers-models.component';

describe('ManageManufacturersModelsComponent', () => {
  let component: ManageManufacturersModelsComponent;
  let fixture: ComponentFixture<ManageManufacturersModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageManufacturersModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageManufacturersModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
