import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  template: `
      <input class="form-control navbar-search-input"
             type="text"
             placeholder="Search for a quiz"
             [(ngModel)]="searchString"
             #navbarSearchInput>
      <button type="submit"
              class="btn btn-success btn-sm"
              (click)="search(navbarSearchInput.value)"
              [disabled]="!searchString">
        Go!
      </button>
  `,
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchString: string;

  constructor(private _router: Router) {}

  search(searchString) {
    this._router.navigate(['/search-results', { searchString: searchString }]);
  }
}


