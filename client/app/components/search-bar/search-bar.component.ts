import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  template: `
      <input type="text" placeholder="Search for a quiz" #navbarSearchInput>
      <button type="btn" (click)="search(navbarSearchInput.value)">Go!</button>
  `,
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(private _router: Router) { }

  search(searchString) {
    this._router.navigate(['/search-results', { searchString: searchString }]);
  }
}


