import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeColumnComponent } from './fake-column.component';

describe('FakeColumnComponent', () => {
  let component: FakeColumnComponent;
  let fixture: ComponentFixture<FakeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
