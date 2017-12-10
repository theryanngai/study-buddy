import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-user-quizzes',
  providers: [QuizService],
  templateUrl: './user-quizzes.component.html',
  styleUrls: ['./user-quizzes.component.scss']
})
export class UserQuizzesComponent implements OnInit {
  @Input() userId: any;
  @Input() firstName: string;
  public userQuizzes: Array <any>;

  constructor(private _quizService: QuizService) {}

  getUserQuizzes(userId) {
    this._quizService.getQuizzesByUserId(userId)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('retrieved Quizzes: ', response);
            this.userQuizzes = response;
          } else {
            console.error('404', 'Quizzes not found for user: ' + userId);
          }
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('User Retrieval Attempt Complete.');
        }
      );
  }

  ngOnInit() {
    this.getUserQuizzes(this.userId);
  }
}
