import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {

  constructor(
    private http: HttpClient) {}

  create(quiz){
    console.log('Attempting to create Quiz: ', quiz.title);
    debugger;
    // this.http.post('/auth/login', user)
    //   .subscribe(
    //     data => {
    //       console.log('Successfully logged in ', user.username);
    //       return data;
    //     },
    //     err => {
    //       console.log(err);
    //       return false;
    //     }
    //   );
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
