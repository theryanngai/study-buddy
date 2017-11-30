import { Component, Input, OnInit } from '@angular/core';
import { QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';
import { AnswerComponent } from './answer/answer.component';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  @ViewChildren(AnswerComponent)
  private viewChildren: QueryList<AnswerComponent>;
  @Input() question: any;
  @Input() questionNumber: number;
  questionAnswers: any = [];
  quizId: number;
  selectedAnswer: number;
  isQuestionSolved: boolean = false;

  constructor(private _quizService: QuizService) {}

  getAnswers(question) {
    this._quizService.getAnswersByQuestionId(question.quizId, question.id)
      .subscribe(
        (response: any) => {
          if (response.length > 0) {
            console.log('Successfully retrieved Answers: ', response);
            response.forEach(answer => this.questionAnswers.push(answer));
          } else {
            console.error('404', 'No Answers found for question: ' + question.questionId);
          }
        },
        (err) => {
          console.error(err);
        },
        () => console.log('Answer Retrieval Attempt Complete.'),
      );
  }

  onAnswerSelect(answer) {
    this.selectedAnswer = answer;
    this.isQuestionSolved = !!answer.isCorrect;
    console.log(this.question.questionText);
  }

  ngOnInit() {
    this.getAnswers(this.question);
  }

}
