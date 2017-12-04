import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'quiz-creation-results',
  templateUrl: './quiz-creation-results.component.html',
  styleUrls: ['./quiz-creation-results.component.css']
})
export class QuizCreationResultsComponent implements OnInit {
  @Input() quizId: number;

  constructor() { }

  ngOnInit() {
  }

}
