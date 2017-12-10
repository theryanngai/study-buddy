import { ActivatedRoute, Params } from '@angular/router';
import { QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { QuestionComponent } from './question/question.component';


@Component({
  selector: 'app-quiz',
  providers: [QuizService],
  template: `
    <div class="container">
      <h1>{{ quiz.title }}</h1>
      <form #quizForm="ngForm" (ngSubmit)="submit()">
        <div *ngFor="let question of quizQuestions; let i = index" [attr.data-index]="i">
          <question [question]="question" [questionNumber]="i + 1"></question>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `,
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  @ViewChildren(QuestionComponent)
  private viewChildren: QueryList<QuestionComponent>;
  quiz: any = { title: '' };
  quizId: any;
  quizQuestions: Array<any> = [];
  submitted: Boolean = false;
  // score: Number;

  constructor(private _quizService: QuizService, private route: ActivatedRoute) {}

  getQuizDetails(quizId) {
    this._quizService.getQuizById(quizId)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('retrieved Quiz: ', response.title);
            this.quiz = response;
            this.getQuestions(this.quiz.id);
          } else {
            console.error('404', 'Quiz not found');
          }
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Quiz Retrieval Attempt Complete.'),
      );
  }

  getQuestions(quizId) {
    this._quizService.getQuestionsByQuizId(quizId)
      .subscribe(
        (response: any) => {
          if (response.length > 0) {
            console.log('Successfully retrieved Questions: ', response);
            response.forEach(question => this.quizQuestions.push(question));
          } else {
            console.error('404', 'No Questions found for quiz: ' + quizId);
          }
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Question Retrieval Attempt Complete.'),
      );
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.quizId = params['quizId'];
      });
    this.getQuizDetails(this.quizId);
  }

  submit() {
    const questionCount = this.quizQuestions.length;
    let correctCount = 0;
    this.viewChildren.forEach((questionComponent) => {
      if (questionComponent.isQuestionSolved) {
        correctCount += 1;
      }
    });

    this.submitted = true;
    alert('You got ' + correctCount + ' out of ' + questionCount + 'correct for a score of ' + correctCount/questionCount*100 + '%.');
  }
}
