import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
      <input type="text" placeholder="Search for a quiz">
  `,
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
