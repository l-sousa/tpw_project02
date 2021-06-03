import {User} from "./User";

export class Customer {
  user: User;

  constructor(user: User) {
    this.user = user;
    this.user.is_customer = true;
  }

}
