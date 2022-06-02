import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturningComponent } from './return.component';


describe('ReturnComponent', () => {
  let component: ReturningComponent;
  let fixture: ComponentFixture<ReturningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
