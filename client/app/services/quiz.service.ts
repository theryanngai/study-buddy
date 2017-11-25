import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {

  constructor(
    private http: HttpClient) {}

  create(quiz){
    console.log('Attempting to create Quiz: ', quiz.title);
    quiz.userId = 12345;
    this.http.post('/quizzes/create', quiz)
      .subscribe(
        data => {
          console.log('Successfully saved quiz ', quiz.title);
          return data;
        },
        err => {
          console.log(err);
          return false;
        }
      );
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
