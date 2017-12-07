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
          <li [hidden]="!isAuthenticated"><a>My Profile</a></li>
          <li [hidden]="!isAuthenticated"><a routerLink="/quiz/create">Create A Quiz</a></li>
          <li [hidden]="!isAuthenticated"><a><app-search-bar></app-search-bar></a></li>
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

  ngOnInit() {
    this._authService.checkLoginStatus()
      .subscribe(
        (response: any) => {
          this.isAuthenticated = true;
        },
        (err) => {
          this.isAuthenticated = false;
        },
        () => {
          console.log('User login status check complete.');
        }
      );
  }
}
