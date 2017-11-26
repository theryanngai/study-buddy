import { Component, Input } from '@angular/core';
import { Answer } from '../../../models/answer';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'answer-creator',
  providers: [QuizService],
  templateUrl: './answer-creator.component.html',
  styleUrls: ['./answer-creator.component.css']
})

export class AnswerCreatorComponent {
  @Input() answerText: string;
  @Input() answerType: string;
  @Input() isCorrect: boolean;
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

    this.answer = new Answer(answerDetails);

    this._quizService.createAnswer(this.answer)
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
