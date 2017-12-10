import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-quiz-scores',
  providers: [QuizService],
  templateUrl: './quiz-scores.component.html',
  styleUrls: ['./quiz-scores.component.scss']
})
export class QuizScoresComponent implements OnInit {
  @Input() quiz: any;
  @Output() backToQuiz = new EventEmitter<string>();
  scores: Array <number> = [];
  averagePercentage: string;
  constructor(private _quizService: QuizService) {}

  getQuizScores(quizId) {
    this._quizService.getCurrentUserQuizScores(quizId)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('retrieved scores for Quiz: ', this.quiz.title);
            this.scores = response;
            this.calculateAveragePercentage(this.scores);
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

  calculateAveragePercentage(scores) {
    const scoresCount = scores.length;
    let scoresSum = 0;

    scores.forEach(scoreObject => scoresSum += scoreObject.score);

    this.averagePercentage = scoresSum/scoresCount * 100 + '%';
  }

  callParent() {
    this.backToQuiz.next();
  }

  ngOnInit() {
    this.getQuizScores(this.quiz.id);
  }

}
