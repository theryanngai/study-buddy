import { Component, Input } from '@angular/core';
import { Answer } from '../../../../../models/answer';
import { QuizService } from '../../../../../services/quiz.service';

@Component({
  selector: 'answer-creator',
  providers: [QuizService],
  template: `
    <div class="answerComponent form-group col s12">
      <span><label for="answerText">Answer #{{ answerNumber }}</label></span>
      <input [(ngModel)]="answerText" id="answerText" name="answerText"
             type="text" class="form-control answerTextInput">

      <span><label for="isCorrect">Correct answer?</label></span>
      <input [checked]="isCorrect" id="isCorrect" name="isCorrect"
             type="checkbox" (change)="isCorrect = !isCorrect">
    </div>
  `,
  styleUrls: ['./answer-creator.component.css']
})

export class AnswerCreatorComponent {
  @Input() answerNumber: number;
  @Input() answerText: string;
  @Input() answerType: string;
  isCorrect = false;
  answer: any;

  constructor(private _quizService: QuizService) {};

  createAnswer(questionInfo) {
    const answerDetails: any = {
      answerText: this.answerText,
      isCorrect: this.isCorrect,
      questionId: questionInfo.questionId,
      // Need to eventually add option for users to create Essay type questions
      // with Essay type answers.
      answerType: questionInfo.questionType,
    };

    const quizId = questionInfo.quizId;

    this.answer = new Answer(answerDetails);

    this._quizService.createAnswer(this.answer, quizId)
      .subscribe(
        (response: any) => {
          console.log('created Answer: ', response.answerText);
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Answer Creation Success!'),
      );
  }
}
