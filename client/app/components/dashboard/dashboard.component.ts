import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'dashboard',
  providers: [ DashboardService ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userQuizzes: Array<any> = [];


  constructor(private _dashboardService: DashboardService) { }

  getUserQuizzes(){
    this._dashboardService.getUserQuizzes()
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('retrieved Quizzes for currently logged in User!');
            this.userQuizzes = response;
          } else {
            console.error('500', 'Something went wrong! Please try again.');
          }
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Quiz Retrieval Attempt Complete.'),
      );
  };


  ngOnInit() {
    this.getUserQuizzes();
  }

}
