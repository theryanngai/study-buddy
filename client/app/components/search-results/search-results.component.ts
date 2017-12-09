import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-search-results',
  providers: [DashboardService],
  template: `
    <div class="container">
      <h1>
        Search Results for: "{{ searchString }}"
      </h1>
      <div *ngFor="let quiz of searchResults">
        <a href="{{ '/quiz/' + quiz.id }}">{{ quiz.title }}</a>
      </div>
    </div>
  `,
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  searchString: string;
  searchResults: Array<any>;

  constructor(private _dashboardService: DashboardService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.searchString = val['searchString'];
      this.search(this.searchString);
    });
  }

  search(searchString) {
    this._dashboardService.findQuizzes(searchString)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log(response);
            this.searchResults = response;
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
}
