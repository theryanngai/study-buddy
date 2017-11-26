import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  constructor(
    private http: HttpClient) {}

  createQuiz(quiz){
    console.log('Attempting to create Quiz: ', quiz.title);
    quiz.userId = 12345;
    return this.http.post('/quizzes/create', quiz);
  }

  createQuestion(question){
    const createQuestionUrl = '/quizzes/' + question.quizId + '/questions/create';
    console.log('Attempting to create Question: ', question.questionText);
    return this.http.post(createQuestionUrl, question);
  }

  createAnswer(answer, quizId) {
    const createAnswerUrl = [
      '/quizzes/',
      quizId,
      '/questions/',
      answer.questionId,
      '/answers/create'
    ].join('');

    console.log('Attempting to create Answer: ', answer.answerText);
    return this.http.post(createAnswerUrl, answer);
  }

  register(user) {
    console.log('Attempting to register user.username');
    this.http.post('/auth/register', user)
      .subscribe(
        data => {
          console.log('Successfully saved user: ', user.username);
        },
        err =>  {
          console.log(err);
        }
      );
  }
}
