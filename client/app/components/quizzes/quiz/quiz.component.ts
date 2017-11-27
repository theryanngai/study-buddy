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

  quiz: any = { title: '' };
  quizId: any;
  quizQuestions: any = [];

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
