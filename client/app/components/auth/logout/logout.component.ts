import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-logout',
  providers: [AuthenticationService],
  template: `
    <h3>{{ resultsMessage }}</h3>
  `,
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  resultsMessage: string;

  constructor(private _authService: AuthenticationService) { }

  logout() {
    this._authService.logout()
      .subscribe(
        (results: any) => {
          this.resultsMessage = 'Thank you! You have successfully logged out of StudyBuddy. Redirecting to login screen...';
          setTimeout(function(){window.location.reload();}, 2000);
        },
        (err) => {
          this.resultsMessage = 'Something went wrong with your logout attempt! Please try again.';
          console.error(err);
        },
        () => console.log('Logout successful!'),
      );
  }

  ngOnInit() {
    this.logout();
  }

}
