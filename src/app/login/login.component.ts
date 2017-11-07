import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from './authentication.service';

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  template: `
    <div class="container">
      <div class="title">
        <h1>Quizzing Reimagined.</h1>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="form-group col s12">
            <input [(ngModel)]="user.username" id="username"
                   type="text" class="form-control">
            <label for="username">Username</label>
          </div>
        </div>

        <div class="row">
          <div class="form-group col s12">
            <input [(ngModel)]="user.password" id="password" 
                   type="password" class="validate form-control">
            <label for="password">Password</label>
          </div>
        </div>

        <span>{{errorMsg}}</span>
        <button (click)="login()"
          class="btn btn-primary"
          type="submit" name="action">Login</button>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User('','');
  public errorMsg = '';

  constructor(
    private _service:AuthenticationService) {}

  login() {
    if(!this._service.login(this.user)){
      this.errorMsg = 'Failed to login';
    }
  }

  ngOnInit() {
  }

}
