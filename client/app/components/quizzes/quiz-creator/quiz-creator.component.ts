import { QueryList, ViewChildren } from '@angular/core';
import { Component } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { QuizService } from '../../../services/quiz.service';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';

@Component({
  selector: 'quiz-creator',
  providers: [QuizService],
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.css']
})

export class QuizCreatorComponent {
  @ViewChildren(QuestionCreatorComponent)
    private viewChildren: QueryList<QuestionCreatorComponent>;

  quiz: any;
  quizId: number;
  isCreationComplete: boolean = false;
  quizQuestions: any = [0];

  constructor(private _quizService: QuizService) {}

  submit(quizDetails) {
    this.quiz = new Quiz(quizDetails);
    this._quizService.createQuiz(this.quiz)
      .subscribe(
        (response: any) => {
          this.viewChildren.forEach((questionComponent) => {
            questionComponent.createQuestion(response.id);
          });
          this.quizId = response.id;

          console.log('created Quiz: ', response.title);
        },
        (err) => {
          console.error(err);
        },
            () => {
              this.isCreationComplete = true;
              console.log('Quiz Creation Success!');
            }
      );
  }

  addQuestion() {
    this.quizQuestions.push(0);
  }

  // isCreationComplete() {
  //   false;
  // }
}
