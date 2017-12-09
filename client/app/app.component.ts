import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header"><a class="navbar-brand" href="#">StudyBuddy</a></div>
        <ul class="nav navbar-nav">
          <li [hidden]="isAuthenticated"><a routerLink="/login">Login</a></li>
          <li [hidden]="isAuthenticated"><a routerLink="/register">Create an Account</a></li>
          <li [hidden]="!isAuthenticated"><a routerLink="/dashboard">Dashboard</a></li>
          <li [hidden]="!isAuthenticated"><a routerLink="/quiz/create">Create A Quiz</a></li>
          <li [hidden]="!isAuthenticated"><a><app-search-bar></app-search-bar></a></li>
          <li [hidden]="!isAuthenticated">
            <a routerLink="/user-profile/{{ currentUser.id }}" >
              {{ currentUser.firstName }} {{ currentUser.lastName }}
            </a>
          </li>
          <li [hidden]="!isAuthenticated"><a routerLink="/logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthenticationService) {};
  title = 'Study Buddy';
  isAuthenticated = false;
  currentUser: any = {};

  ngOnInit() {
    this._authService.getCurrentUser()
      .subscribe(
        (response: any) => {
          this.currentUser = response;
          this.isAuthenticated = true;
        },
        (err) => {
          console.error('404', 'No currently logged in user was found.');
          this.isAuthenticated = false;
        },
        () => {
          console.log('Current User found.');
        }
      );
  }
}
