import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendshipService {
  constructor(
    private http: HttpClient) {}

  createFriendship(friendCandidate) {
    console.log('Attempting to create Friendship with: ', friendCandidate.username);
    return this.http.post('/api/friendships/create', friendCandidate);
  }

  getFriendshipsByUserId(userId) {
    console.log('Attempting to get Friendships for userId:', userId);
    return this.http.get('/api/friendships/getFriendshipsByUserId/' + userId);
  }
}
