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
}
