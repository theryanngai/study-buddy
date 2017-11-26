import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question';

@Component({
  selector: 'question-creator',
  providers: [],
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})

export class QuestionCreatorComponent {
  @Input() quiz: any;
  @Input() testText: string;
  question: any;

  constructor() {};



  // submit(questionDetails) {
  //   this.question = new Question(questionDetails);
  //   this._quizService.create(this.question);
  // }
}
