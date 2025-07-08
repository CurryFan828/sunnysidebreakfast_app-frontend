import { Food } from "./Food"

export class CartItem {
    constructor(food:Food){
        this.food = food;
        this.price;
    }
    food: Food;
    quantity: number = 1;

    // This will call the price function[price.()] each time even if we don't put the'()' because of getter/setter
    get price(): number{
        return this.food.price * this.quantity;
    }
}