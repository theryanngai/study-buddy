import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'answer',
  template: `
    {{ answer.answerText }}
  `,
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer: any;

  constructor() { }

  ngOnInit() {
  }

}
