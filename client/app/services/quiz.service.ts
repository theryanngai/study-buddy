import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  constructor(
    private http: HttpClient) {}

  create(quiz){
    console.log('Attempting to create Quiz: ', quiz.title);
    quiz.userId = 12345;
    return this.http.post('/quizzes/create', quiz)
      // .map(res => res.json());
      // .toPromise(
      //   quiz => {
      //     console.log('Successfully saved quiz ', quiz.title);
      //     return quiz;
      //   }
      // );
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
