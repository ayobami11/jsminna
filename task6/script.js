/*
    Explanation of methods used in the code:

    removeDuplicates(): 
    This function takes in the items in the basket array and returns a new array containing only unique 
    items based on the name of the item (itemName property).

    addItem(): 
    This function takes in arguments which contain the details of the item and stores them in a new object. 
    It then sets the item object to the new object, and also invokes basket's setter method.

    updateItem(): 
    This function takes in the name of the item to be updated. It then updates the item's property using  
    parameter to set the value if the property exists on the object.

    removeItem(): 
    This function takes in the name of the item to be removed and reduces the quantity of the item, only 
    if the quantity parameter is less than or equal to the quantity of the item. After the reduction, if the 
    quantity of the item left is 0, the item is removed from the basket array.

    _total(): 
    This function calculates and returns the total price of all the items ordered (items in the basket array).

    checkout(): 
    This function returns true if the cash is greater than or equal to the total price of the items, and 
    returns false if otherwise.
*/

// 1. Object constructors
function Cart() {
    let basket = [];
    let item = {};

    // Item getter and setter
    Object.defineProperty(this, 'item', {
        get: function() {
            return item;
        },
        set: function(itemDetails) {
            item = itemDetails;
        }
    });

    // Basket getter and setter
    Object.defineProperty(this, 'basket', {
        get: function() {
            return basket;
        },
        set: function(newItem) {
            basket.push(newItem);
            basket = this.removeDuplicates(basket);
        }
   });

    this.removeDuplicates = (itemList) => {
        const itemNames = itemList.map(item => item.itemName);
        const uniqueItemNames = Array.from(new Set(itemNames));
        const uniqueItems = uniqueItemNames.map(itemName => {
            return itemList.find(item => item.itemName === itemName);
        });
        return uniqueItems;
    }

    this.addItem = (itemName, quantity, price) => {
        const newItem = {
            itemName,
            quantity,
            price
        }
        this.item = newItem;
        this.basket = this.item;
    }

    this.updateItem = (itemName, parameter, value) => {
        if (parameter === 'quantity' || parameter === 'price') {
            const itemToUpdate = this.basket.find(item => item.itemName === itemName);
            itemToUpdate[parameter] = value;
        } else {
            throw new Error('The item property to be updated cannot be found.');
        }
    }

    this.removeItem = (itemName, quantity) => {
        const itemToRemove = this.basket.find(item => item.itemName === itemName);

        if (!(quantity <= itemToRemove.quantity)) {
            throw new Error('The quantity of items to be removed must be less than or equal to the available quantity.');
        }

        if (itemToRemove.quantity === quantity) {
            const itemToRemoveIndex = this.basket.indexOf(itemToRemove);
            this.basket.splice(itemToRemoveIndex, 1);
        } else {
            itemToRemove.quantity -= quantity;
        }
    }

    this._total = () => {
        const itemPrices = this.basket.map(item => item.quantity * item.price);
        const totalPrice = itemPrices.reduce((sum, itemPrice) => {
            return sum + itemPrice;
        });
        return totalPrice;
    }

    Object.defineProperty(this, 'total', {
        get: function() {
            return this._total();
        }
    });
}

function Shop() {
    Cart.call(this);

    this.checkout = (cash) => {
        return (cash >= this.total);
    }
}

// Sets the prototype of the Shop constructor to Cart
Shop.prototype = Object.create(Cart.prototype);
Object.defineProperty(Shop.prototype, 'constructor', {
    value: Shop,
    enumerable: false,
    writable: false
});

const myShop = new Shop();
myShop.addItem('bag', 20, 1500);
myShop.addItem('ball', 2, 4);
myShop.addItem('book', 100, 2);
myShop.addItem('book', 3, 40);
myShop.addItem('chair', 2, 100);
myShop.addItem('chair', 32, 11);

myShop.updateItem('chair', 'quantity', 15);
myShop.updateItem('ball', 'price', 10);

myShop.removeItem('book', 32);

console.log(myShop.checkout(35000));

// 2. Object Class
class CartClass {
    constructor() {
        this._item = {};
        this._basket = [];
    }

    get item() {
        return this._item;
    }
    
    set item(itemDetails) {
        this._item = itemDetails;
    }
    
    get basket() {
        return this._basket;
    }
    
    set basket(item) {
        this._basket.push(item);
        this._basket = this.removeDuplicates(this.basket);
    }

    removeDuplicates(itemList) {
        const itemNames = itemList.map(item => item.itemName);
        const uniqueItemNames = Array.from(new Set(itemNames));
        const uniqueItems = uniqueItemNames.map(itemName => {
            return itemList.find(item => item.itemName === itemName);
        });
        return uniqueItems;
    }

    addItem(itemName, quantity, price) {
        const newItem = {
            itemName,
            quantity,
            price
        }
        this.item = newItem;
        this.basket = this.item;
    }

    updateItem(itemName, parameter, value) {
        if (parameter === 'quantity' || parameter === 'price') {
            const itemToUpdate = this.basket.find(item => item.itemName === itemName);
            itemToUpdate[parameter] = value;
        } else {
            throw new Error('The object property to be updated cannot be found.');
        }
    }

    removeItem(itemName, quantity) {
        const itemToRemove = this.basket.find(item => item.itemName === itemName);

        if (!(quantity <= itemToRemove.quantity)) {
            throw new Error('The quantity of items to be removed must be less than or equal to the available quantity.');
        }

        if (itemToRemove.quantity === quantity) {
            const itemToRemoveIndex = this.basket.indexOf(itemToRemove);
            this.basket.splice(itemToRemoveIndex, 1);
        } else {
            itemToRemove.quantity -= quantity;
        }
    }

    _total() {
        const itemPrices = this.basket.map(item => item.quantity * item.price);
        const totalPrice = itemPrices.reduce((sum, itemPrice) => {
            return sum + itemPrice;
        });
        return totalPrice;
    }

    get total() {
        return this._total();
    }
}

class ShopClass extends CartClass {
    constructor(total) {
        super(total);
    }

    checkout(cash) {
        return (cash >= this.total);
    }
}

const myOrder = new ShopClass();
myOrder.addItem('bag', 20, 1500);
myOrder.addItem('ball', 2, 4);
myOrder.addItem('book', 100, 2);
myOrder.addItem('book', 3, 40);
myOrder.addItem('chair', 2, 100);
myOrder.addItem('chair', 32, 11);

myOrder.updateItem('chair', 'quantity', 15);
myOrder.updateItem('ball', 'price', 10);

myOrder.removeItem('book', 32);

console.log(myOrder.checkout(35000));