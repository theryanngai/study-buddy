import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  providers: [AuthenticationService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:any;

  submit(userInfo) {
    this.user = new User(userInfo);
    this.user.save();
  }
}
