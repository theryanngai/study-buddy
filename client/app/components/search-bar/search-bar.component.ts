import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-search-bar',
  providers: [DashboardService],
  template: `
      <input type="text" placeholder="Search for a quiz" #navbarSearchInput>
      <button type="btn" (click)="search(navbarSearchInput.value)">Go!</button>
  `,
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(private _dashboardService: DashboardService) { }

  search(searchString) {
    this._dashboardService.findQuizzes(searchString)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log(response);
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
  }
}


