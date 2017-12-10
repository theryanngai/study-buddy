import { ActivatedRoute, Params } from '@angular/router';
import { QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { QuestionComponent } from './question/question.component';
import { QuizScoresComponent} from "./quiz-scores/quiz-scores.component";
import { SharedSessionsService} from "../../../services/sessions.service";
import { Score } from '../../../models/score';


@Component({
  selector: 'app-quiz',
  providers: [QuizService],
  template: `
    <div [hidden]="showQuizScoreHistory" class="container">
      <h1 class="quiz-title">{{ quiz.title }}</h1>
      <h3 [hidden]="!submitted">{{ quizResultsText }}</h3>
      <form #quizForm="ngForm" (ngSubmit)="submit()">
        <div *ngFor="let question of quizQuestions; let i = index" [attr.data-index]="i">
          <question [question]="question" [questionNumber]="i + 1"></question>
        </div>
        <button [disabled]="submitted" type="submit" class="btn btn-primary quiz-submit-btn">
          Submit
        </button>
        <div>
          <a (click)="showQuizScoreHistory = true">View your historical performance on this Quiz</a>
        </div>
        <h3 [hidden]="!submitted">
          Good work! <a (click)="reloadQuiz()">Click here</a> to give this quiz another shot.
        </h3>
      </form>
    </div>
    <app-quiz-scores (backToQuiz)="showQuizScoreHistory=false" *ngIf="showQuizScoreHistory" [quiz]="quiz">
    </app-quiz-scores>
  `,
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  @ViewChildren(QuestionComponent) private viewChildren: QueryList<QuestionComponent>;
  quiz: any = { title: '' };
  quizScore: any;
  quizResultsText: string;
  quizId: any;
  quizQuestions: Array<any> = [];
  submitted: Boolean = false;
  isScoringComplete: Boolean = false;
  showQuizScoreHistory: Boolean = false;

  constructor(private _quizService: QuizService,
              private route: ActivatedRoute,
              private _sessionsService: SharedSessionsService) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.quizId = params['quizId'];
      });
    this.getQuizDetails(this.quizId);
  }

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
            // Shuffle questions so quiz is in different order each time
            this.shuffleArray(response).forEach(question => this.quizQuestions.push(question));
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

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  createScore(score) {
    this._quizService.createScore(score)
      .subscribe(
        (response: any) => {
          this.quizScore = response;
          console.log('created Score for QuizID:', response.quizId, 'and UserID:', response.userId);
        },
        (err) => {
          console.error(err);
        },
        () => {
          this.isScoringComplete = true;
          console.log('Score Creation Success!');
        }
      );
  }

  reloadQuiz() {
    window.location.reload();
  }

  submit() {
    // Creating details to pass to score model constructor
    let scoreDetails = {
      correctCount: 0,
      incorrectCount: 0,
      userId: this._sessionsService.currentUser.id,
      quizId: this.quizId,
      score: <number> null,
    };

    // Counting up correct/incorrect answers
    this.viewChildren.forEach((questionComponent) => {
      if (questionComponent.isQuestionSolved) {
        scoreDetails.correctCount += 1;
      } else {
        scoreDetails.incorrectCount += 1;
      }

      // Tell each question component to reveal if the correct answer has been chosen.
      questionComponent.showResults();
    });

    // Calculating quiz score (decimal)
    const totalQuestionCount = this.quizQuestions.length;
    scoreDetails.score = scoreDetails.correctCount / totalQuestionCount;

    this.quizResultsText = 'You scored ' + (scoreDetails.score * 100) + '%! Please review your ' +
      'results below.';

    // Instantiating Score
    const score = new Score(scoreDetails);

    // Calling method to POST score
    this.createScore(score);
    this.submitted = true;
  }
}
