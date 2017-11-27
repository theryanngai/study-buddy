import { QueryList, ViewChildren } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Question } from '../../../../models/question';
import { QuizService } from '../../../../services/quiz.service';
import { AnswerCreatorComponent } from "./answer-creator/answer-creator.component";

@Component({
  selector: 'question-creator',
  providers: [QuizService],
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})

export class QuestionCreatorComponent {
  @ViewChildren(AnswerCreatorComponent)
  private viewChildren: QueryList<AnswerCreatorComponent>;

  @Input() questionText: string;
  @Input() questionType: string;
  question: any;
  answers: any = [0];

  constructor(private _quizService: QuizService) {};

  createQuestion(quizId) {
    const questionDetails: any = {
      questionText: this.questionText,
      quizId: quizId,
      // Need to eventually add option for users to create Essay type questions.
      questionType: 'multipleChoice',
    };

    this.question = new Question(questionDetails);

    this._quizService.createQuestion(this.question)
      .subscribe(
        (response: any) => {
          this.viewChildren.forEach((answerComponent) => {
            const questionInfo = {
              quizId: response.quizId,
              questionId: response.id,
              questionType: response.questionType,
            };

            answerComponent.createAnswer(questionInfo);
          });
          console.log('created Question: ', response.questionText);
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Question Creation Success!'),
      );
  }

  addAnswer() {
    this.answers.push(0);
  }
}
