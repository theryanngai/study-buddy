export class SharedSessionsService {
  currentUser: any;

  constructor() {}

  setCurrentUser(user: any) {
    this.currentUser = user;
  }
}
