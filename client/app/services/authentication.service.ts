import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient) {}

  // logout() {
  //   localStorage.removeItem("user");
  //   this._router.navigate(['Login']);
  // }

  login(user){
    console.log('Attempting to login', user.username);
    return this.http.post('/auth/login', user);
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
