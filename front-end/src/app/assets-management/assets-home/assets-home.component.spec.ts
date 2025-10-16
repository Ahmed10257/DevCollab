import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsHomeComponent } from './assets-home.component';

describe('AssetsHomeComponent', () => {
  let component: AssetsHomeComponent;
  let fixture: ComponentFixture<AssetsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
