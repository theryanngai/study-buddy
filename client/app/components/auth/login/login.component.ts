import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user';

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

  constructor(private _authService: AuthenticationService, private _router: Router) {}

  login(loginInfo) {
    this.user = new User(loginInfo);
    this._authService.login(this.user)
      .subscribe(
      (user: any) => {
        this.successfulLogin = true;
        this.successMsg = 'Successfully logged in as: ' + user.username;
        console.log('Logged in: ', user.username);
        this._router.navigateByUrl('/dashboard');
        window.location.reload();
      },
      (err) => {
        this.errorMsg = err.error.status;
        this.successfulLogin = false;
        console.error(err);
      },
      () => console.log('Login successful!'),
    );
  }

  ngOnInit() {
  }

}
