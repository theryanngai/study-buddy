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
  successfulLogin: boolean;
  public successMsg = '';
  public errorMsg = '';

  constructor(
    private _authService: AuthenticationService) {}

  login(loginInfo) {
    this.user = new User(loginInfo);
    this._authService.login(this.user)
      .subscribe(
      (user: any) => {
        this.successfulLogin = true;
        this.successMsg = 'Successfully logged in as: ' + user.username;
        console.log('Logged in: ', user.username);
      },
      (err) => {
        this.errorMsg = 'Failed to login.';
        this.successfulLogin = false;
        console.error(err);
      },
      () => console.log('Login successful!'),
    );
  }

  ngOnInit() {
  }

}
