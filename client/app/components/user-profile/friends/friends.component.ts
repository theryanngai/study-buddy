import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { FriendshipService } from '../../../services/friendship.service';

@Component({
  selector: 'app-friends',
  providers: [UserService, AuthenticationService, FriendshipService],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  firstName: string;
  currentUser: any;
  userSearchString = '';
  userSearchResults: Array<any> = [];
  friendList: Array<any> = [];
  constructor(private _userService: UserService,
              private _authService: AuthenticationService,
              private _friendService: FriendshipService) {}

  getUserFriends(userId) {
    return this._friendService.getFriendshipsByUserId(userId)
      .subscribe(
        (response: any) => {
          const friendIds = [];
          console.log('Found Friends: ', response);
          response.forEach(friendObject => friendIds.push(friendObject.friend));
          this.getFriendDetailsByIds(friendIds);
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('Friend Retrieval Successful!');
        }
      );
  }

  getFriendDetailsByIds(userIds) {
    return this._userService.getUsersByIds(userIds)
      .subscribe(
        (response: any) => {
          console.log('Found friend details: ', response);
          this.friendList = response;
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('Friend Details Retrieval Successful!');
        }
      );
  }

  addFriend(friendCandidate) {
    return this._friendService.createFriendship(friendCandidate)
      .subscribe(
        (response: any) => {
          console.log('Added Friend: ', response.username);
          this.friendList.push(response);
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('Friendship Creation Successful!');
        }
      );
  }

  search(searchString) {
    return this._userService.searchUsers(searchString)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log(response);
            this.userSearchResults = response;
          } else {
            console.error('404', 'No users found');
          }
        },
        (err) => {
          console.error(err);
        },
        () => console.log('User Search Attempt Complete.'),
      );
  }

  ngOnInit() {
    this._authService.getCurrentUser()
      .subscribe(
        (response: any) => {
          this.currentUser = response;
          this.firstName = this.currentUser.firstName;
          this.getUserFriends(this.currentUser.id);
        },
        (err) => {
          console.error('404', 'No currently logged in user was found.');
        },
        () => {
          console.log('Current User found.');
        }
      );
  }

}
