export class User {
  username: string;
  password: string;
  is_customer: boolean;
  is_manager: boolean;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.is_customer = false;
    this.is_manager = false;

  }
}
