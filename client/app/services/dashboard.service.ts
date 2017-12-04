import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
  constructor(
    private http: HttpClient) {}

  getUserQuizzes() {
    const getUserQuizzesUrl = '/api/quizzes/myQuizzes';
    console.log('Attempting to get quizzes created by current user.');
    return this.http.get(getUserQuizzesUrl);
  }
}
