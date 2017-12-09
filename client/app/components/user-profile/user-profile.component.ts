import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  providers: [UserService],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: any = {};
  public isEditingEmail = false;
  public isEditingAboutMe = false;
  public successMessage = 'Your profile changes were successfully saved!';
  public failureMessage = 'Something went wrong! We were unable to save your profile changes.';
  public isUpdateSuccessful: boolean;
  public isSubmitted: boolean;




  constructor(private _userService: UserService, private route: ActivatedRoute) { }

  getUserDetails(userId) {
    this._userService.getUserById(userId)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('retrieved User: ', response.username);
            this.user = new User(response);
          } else {
            console.error('404', 'User not found');
          }
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('User Retrieval Attempt Complete.');
        }
      );
  }

  saveUser() {
    this.isSubmitted = true;
    this._userService.patchUser(this.user)
      .subscribe(
        (response: any) => {
          this.user = response;
          console.log('saved updates to User: ', response.username);
          this.isUpdateSuccessful = true;
        },
        (err) => {
          console.error(err);
          this.isUpdateSuccessful = false;
        },
        () => {
          console.log('User Update Success!');
        }
      );
  }

  ngOnInit() {
    let userId;
    this.route.params
      .subscribe((params: Params) => {
        userId = parseInt(params['userId']);
      });
    this.getUserDetails(userId);
  }

}
