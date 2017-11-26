import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreationResultsComponent } from './quiz-creation-results.component';

describe('QuizCreationResultsComponent', () => {
  let component: QuizCreationResultsComponent;
  let fixture: ComponentFixture<QuizCreationResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCreationResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCreationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
