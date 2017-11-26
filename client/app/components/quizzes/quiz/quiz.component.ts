import { Router, ActivatedRoute, Params } from '@angular/router';
import { QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { QuizService } from '../../../services/quiz.service';
import { QuestionComponent } from './question/question.component';


@Component({
  selector: 'quiz',
  providers: [QuizService],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  @ViewChildren(QuestionComponent)
  private viewChildren: QueryList<QuestionComponent>;

  quiz: any;
  quizId: any;
  quizQuestions: any = [0, 0, 0];

  constructor(private _quizService: QuizService, private route: ActivatedRoute) {}

  getQuizDetails(quizId) {
    this._quizService.getQuizById(quizId)
      .subscribe(
        (response: any) => {
          // this.viewChildren.forEach((questionComponent) => {
          //   questionComponent.getQuestionByQuizId(response.id);
          // });
          if (response) {
            console.log('retrieved Quiz: ', response.title);
            this.quiz = response;
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

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.quizId = params['quizId'];
      });
    this.getQuizDetails(this.quizId);
  }

  // submit(quizDetails) {
  // this.quiz = new Quiz(quizDetails);
  // this._quizService.createQuiz(this.quiz)
  //   .subscribe(
  //     (response: any) => {
  //       this.viewChildren.forEach((questionComponent) => {
  //         questionComponent.createQuestion(response.id);
  //       });
  //
  //       console.log('created Quiz: ', response.title);
  //     },
  //     (err) => {
  //       console.error(err);
  //     },
  //     () => console.log('Quiz Creation Success!'),
  //   );
  //  }
}
