import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'question-creator',
  providers: [QuizService],
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})

export class QuestionCreatorComponent {
  @Input() quiz: any;
  @Input() questionText: string;
  question: any;

  constructor(private _quizService: QuizService) {};

  createQuestion() {
    // this.question = new Question();
  }
}
