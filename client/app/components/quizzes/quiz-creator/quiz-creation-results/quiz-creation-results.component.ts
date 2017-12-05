import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'quiz-creation-results',
  template: `
    <p>
      Hooray! Your quiz was successfully created.
      <a href="/quiz/{{ quizId }}">Click here</a> to try it out!
    </p>
  `,
  styleUrls: ['./quiz-creation-results.component.css']
})
export class QuizCreationResultsComponent implements OnInit {
  @Input() quizId: number;

  constructor() { }

  ngOnInit() {
  }

}
