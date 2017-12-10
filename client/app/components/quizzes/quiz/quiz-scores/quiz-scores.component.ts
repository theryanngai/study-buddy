import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-quiz-scores',
  providers: [QuizService],
  templateUrl: './quiz-scores.component.html',
  styleUrls: ['./quiz-scores.component.scss']
})
export class QuizScoresComponent implements OnInit {
  @Input() quiz: any;
  scores: Array <number> = [];
  constructor(private _quizService: QuizService) {}

  getQuizScores(quizId) {
    this._quizService.getCurrentUserQuizScores(quizId)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('retrieved scores for Quiz: ', this.quiz.title);
            this.scores = response;
          } else {
            console.error('404', 'Scores not found');
          }
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Score Retrieval Attempt Complete.'),
      );
  }

  ngOnInit() {
    debugger;
    this.getQuizScores(this.quiz.id);
  }

}
