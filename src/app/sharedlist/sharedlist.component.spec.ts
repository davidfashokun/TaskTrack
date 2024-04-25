import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedlistComponent } from './sharedlist.component';

describe('SharedlistComponent', () => {
  let component: SharedlistComponent;
  let fixture: ComponentFixture<SharedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
