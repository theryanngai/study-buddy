
export class User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;

  constructor(userInfo: any) {
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.email = userInfo.email;
    this.username = userInfo.username;
    this.password = userInfo.password;
  }
}




