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
  @Input() questionText: string;
  @Input() correctAnswerId: number;
  @Input() questionType: string;
  question: any;

  constructor(private _quizService: QuizService) {};

  createQuestion(quizId) {
    const questionDetails: any = {
      questionText: this.questionText,
      quizId: quizId,
      questionType: 'multipleChoice',
      correctAnswerId: this.correctAnswerId,
    };

    this.question = new Question(questionDetails);

    this._quizService.createQuestion(this.question)
      .subscribe(
        (response: any) => {
          //create Answers
          console.log('created Question: ', response.questionText);
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Question Creation Success!'),
      );
  }
}
