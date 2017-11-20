import { Component } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-creator',
  providers: [QuizService],
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.css']
})

export class QuizCreatorComponent {
  quiz: any;

  constructor(private _quizService: QuizService) {};

  submit(quizDetails) {
    this.quiz = new Quiz(quizDetails);
    this._quizService.create(this.quiz);
  }
}
