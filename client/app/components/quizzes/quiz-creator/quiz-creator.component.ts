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
  creationComplete: boolean;
  testText:string = 'hello';
  quizQuestions: any = [0];

  constructor(private _quizService: QuizService) {};

  submit(quizDetails) {
    debugger;
    this.quiz = new Quiz(quizDetails);
    this._quizService.create(this.quiz);
  }

  addQuestion() {
    this.quizQuestions.push(0);
  }

  isCreationComplete() {
    false;
  }
}
