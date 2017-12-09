
export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  aboutMe: string;
  profilePicture: string;

  constructor(userInfo: any) {
    this.id = userInfo.id;
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.email = userInfo.email;
    this.username = userInfo.username;
    this.password = userInfo.password;
    this.aboutMe = userInfo.aboutMe;
    this.profilePicture = userInfo.profilePicture;
  }
}




