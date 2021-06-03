import {Category} from "./Category";
import {Brand} from "./Brand";

export class Product {
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  price: number;
  quantity: number;
  image: HTMLImageElement;

  constructor(name: string, description: string, category: Category, brand: Brand, price: number, quantity: number, image: HTMLImageElement) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }

}
