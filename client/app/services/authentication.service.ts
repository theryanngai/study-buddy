import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

export class User {
  constructor(
    public email: string,
    public password: string) {}
}

var users = [
  new User('admin@admin.com','adm9'),
  new User('user1@gmail.com','a23')
];

@Injectable()
export class AuthenticationService {

  constructor(
    private _router: Router,
    private http: HttpClient) {}

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }

  login(user){
    debugger;
    console.log('Attempting to login user.username');
    this.http.post('/auth/login', user)
      .subscribe(
        data => {
          console.log('Successfully logged in ', user.username);
        },
        err => {
          console.log(err);
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

  checkCredentials(){
    if (localStorage.getItem("user") === null){
      this._router.navigate(['Login']);
    }
  }
}
