import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  providers: [AuthenticationService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
