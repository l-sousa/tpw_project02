import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import {Emitters} from '../emitters/emitters';
import {Order} from '../models/Order';
import {Product} from '../models/Product';
import {CheckAuthUserService} from '../services/check-auth-user/check-auth-user.service';
import {CheckoutService} from '../services/checkout/checkout.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: Array<any>;
  total = 0;
  username: string;
  checkoutConfirmation = false;
  cartEmptyError = false;

  constructor(private checkAuthUserService: CheckAuthUserService,
              private checkoutService: CheckoutService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.items = this.findLocalItems("cart_item/");
    this.subscribeToEmitters();
    this.calcTotalPrice();

  }

  subscribeToEmitters() {
    Emitters.newCartItemEmitter.subscribe(
      (item: string) => {
        this.handleNewItem(item);
      }
    );
    Emitters.userEmitter.subscribe(
      (username: string) => {
        this.username = username;
      }
    );
  }


  calcTotalPrice() {
    this.total = 0;
    for (var _i = 0; _i < this.items.length; _i++) {
      this.total += Number(this.items[_i]["price"])
    }
  }

  handleNewItem(item: string) {
    var item_obj = JSON.parse(item);
    var key = "cart_item/" + item_obj["id"];

    localStorage.setItem(key, item);

    var value = JSON.parse(localStorage.getItem(key));
    this.items.push(value);
    this.total += Number(item_obj["price"]);

  }

  addToShoppingCart(product: Product) {
    var key = "cart_item/" + product.id;
    localStorage.setItem(key, JSON.stringify(product))
    Emitters.newCartItemEmitter.emit(localStorage.getItem(key));
  }

  findLocalItems(query) {
    var i, results = [];
    var count = 0;
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          var item_obj = JSON.parse(localStorage.getItem(i));
          results.push(item_obj);
          count++;
        }
      }
    }
    return results;
  }

  removeProduct(product_id: number) {
    for (var _i = 0; _i < this.items.length; _i++) {
      if (this.items[_i]["id"] == product_id) {
        localStorage.removeItem("cart_item/" + product_id);
        this.total -= Number(this.items[_i]["price"]);
        this.items = this.findLocalItems("cart_item/");
      }
    }
  }

  checkout(): void {
    this.checkoutService.checkout({'username': this.username, 'products': this.items})
      .subscribe((res: any) => {
          localStorage.clear();
          this.total = 0;
          this.router.navigate(['']);
          this.items.length = 0;
          this.checkoutConfirmation = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error checking out");
        });
  }

  async onConfirmationCheckout() {
    if (this.items.length > 0) {
      this.checkoutConfirmation = true;

    } else {
      this.cartEmptyError = true;
      await timer(3000).pipe(take(1)).toPromise();
      this.cartEmptyError = false;

    }
  }

  offConfirmationCheckout() {
    console.log("was true");
    this.checkoutConfirmation = false;
    console.log(this.checkoutConfirmation);
  }
}
