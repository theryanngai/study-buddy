import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header"><a class="navbar-brand" href="#">StudyBuddy</a></div>
        <ul class="nav navbar-nav">
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/login">Login</a></li>
          <li><a routerLink="/register">Create an Account</a></li>
          <li><a>My Profile</a></li>
          <li><a>Create A Quiz</a></li>
          <li><a>Search</a></li>
          <li><a>Placeholder</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Study Buddy';
}
