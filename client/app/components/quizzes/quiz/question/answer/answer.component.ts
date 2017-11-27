import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer: any;

  constructor() { }

  ngOnInit() {
  }

}
