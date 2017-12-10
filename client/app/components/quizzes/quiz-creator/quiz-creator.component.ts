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

  isPublic = false;
  quiz: any;
  quizId: number;
  isCreationComplete = false;
  quizQuestions: any = [0];

  constructor(private _quizService: QuizService) {}

  submit(quizDetails) {
    quizDetails.tags = this.processTags(quizDetails.tagString);
    this.quiz = new Quiz(quizDetails);
    return this._quizService.createQuiz(this.quiz)
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

  processTags(tagString) {
    return tagString.split(",").map(item => item.trim());
  }

  addQuestion() {
    this.quizQuestions.push(0);
  }

  // isCreationComplete() {
  //   false;
  // }
}
