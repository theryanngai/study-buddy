import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRaterComponent } from './quiz-rater.component';

describe('QuizRaterComponent', () => {
  let component: QuizRaterComponent;
  let fixture: ComponentFixture<QuizRaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
