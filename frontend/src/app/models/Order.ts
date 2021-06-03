import {Customer} from "./Customer";
import {Product} from "./Product";

export class Order {
  customer: Customer;
  order_date: Date;
  products: Product[];
  is_complete: boolean;

  constructor(customer: Customer, order_date: Date, products: Product[]) {
    this.customer = customer;
    this.order_date = order_date;
    this.products = products;
    this.is_complete = false;
  }

}
