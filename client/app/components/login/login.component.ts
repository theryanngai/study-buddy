import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  public errorMsg = '';

  constructor(
    private _authService: AuthenticationService) {}

  login(loginInfo) {
    this.user = new User(loginInfo);
    // if (!this._authService.login(this.user)) {
    //   this.errorMsg = 'Failed to login';
    // }
  }

  ngOnInit() {
  }

}
