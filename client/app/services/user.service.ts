import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getUserById(userId) {
    const getUserByIdUrl = '/api/user/' + userId;
    console.log('Retrieving user with ID: ', userId);
    return this.http.get(getUserByIdUrl, userId);
  }

  patchUser(userDetails) {
    const patchUserUrl = '/api/user/' + userDetails.id;
    console.log('Patching user: ', userDetails.username);
    return this.http.patch(patchUserUrl, userDetails);
  }

  checkLoginStatus() {
    const loginStatusUrl = '/api/loginCheck';
    console.log('Checking login status.');
    return this.http.get(loginStatusUrl);
  }

  login(user){
    const loginUrl = '/auth/login';
    console.log('Attempting to login', user.username);
    return this.http.post(loginUrl, user);
  }

  logout() {
    const logoutUrl = '/auth/logout';
    console.log('Attempting to logout current user.');
    return this.http.get(logoutUrl);
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
