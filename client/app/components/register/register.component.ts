import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  providers: [AuthenticationService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any;
  resultsMessage: string;
  isRegistrationComplete: Boolean;

  constructor(private authService: AuthenticationService) {};

  submit(userInfo) {
    // const ctrl = this;
    this.user = new User(userInfo);
    this.authService.register(this.user)
      .subscribe(
        data => {
          console.log('Successfully registered user.');
          this.resultsMessage = 'Thank you for registering with StudyBuddy!';
          this.isRegistrationComplete = true;
        },
        err =>  {
          this.resultsMessage = 'Something went wrong with your registration! Please try again.';
          console.log(err);
        }
      );;
  }
  hello() {

  }
}
