let allGlazings = [
    {
        glazing: 'Keep original',
        price: 0,},
    {
        glazing: 'Sugar milk',
        price: 0,},
    {
        glazing: 'Vanilla milk',
        price: 0.5,},
    {
        glazing: 'Double chocolate',
        price: 1.5,},
];
let allPackSizes = [
    {
        packSize: '1',
        priceAdaptation: 1,},
    {
        packSize: '3',
        priceAdaptation: 3,},
    {
        packSize: '6',
        priceAdaptation: 5,},
    {
        packSize: '12',
        priceAdaptation: 10,},
];

const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg",
        "name": "Original Cinnamon Roll",
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg",
        "name": "Apple Cinnamon Roll",
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg",
        "name": "Raisin Cinnamon Roll",
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg",
        "name": "Walnut Cinnamon Roll",
    },
    "Double-chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg",
        "name": "Double-chocolate Cinnamon Roll",
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg",
        "name": "Strawberry Cinnamon Roll",
    }    
};

const cartSet = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.element = null;
        const glazingPrice = allGlazings.find(glazing => glazing.glazing === rollGlazing).price;
        const packSizeAdaptation = allPackSizes.find(size => size.packSize === packSize).priceAdaptation;
        this.calculatedPrice = (basePrice + glazingPrice) * packSizeAdaptation;
}}

function addNewRoll(rollType, rollGlazing, packSize){
    const newRoll=new Roll(rollType, rollGlazing, packSize, rolls[rollType].basePrice);
    cartSet.add(newRoll);
    return newRoll;
    }
    
function createElement(newRoll) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    newRoll.element = clone.querySelector('.cartContainer');
    
    const btnDelete = newRoll.element.querySelector('.remove');
    console.log(btnDelete);
    btnDelete.addEventListener('click', () => {
      deleteRoll(newRoll);
    });

    const CartSetElement = document.querySelector('.cartContent');
    CartSetElement.prepend(newRoll.element);
    updateElement(newRoll);
}

function updateElement(newRoll) {
    const cartImageElement = newRoll.element.querySelector('.cartRollImage');
    const cartRollNameElement = newRoll.element.querySelector('.cartRollName');
    const cartRollGlazingElement = newRoll.element.querySelector('.cartRollGlazing');
    const cartRollPackSizeElement = newRoll.element.querySelector('.cartRollPackSize');
    const calculatedPriceElement = newRoll.element.querySelector('.calculatedPrice');
    
    cartImageElement.src = '../assets/products/' + rolls[newRoll.type].imageFile;
    cartRollNameElement.innerText = newRoll.type + ' Cinnammon Roll';
    cartRollGlazingElement.innerText = newRoll.glazing;
    cartRollPackSizeElement.innerText = 'Pack Size: ' + newRoll.size;
    calculatedPriceElement.innerText = '$ ' + newRoll.calculatedPrice.toFixed(2);

}

function deleteRoll(newRoll) {
    totalPrice -= newRoll.calculatedPrice;
    newRoll.element.remove();
    cartSet.delete(newRoll);
    cartPrice.innerText = totalPrice.toFixed(2);
  }

const cartItem1 = addNewRoll(
    'Original', 'Sugar milk', '1'
);
const cartItem2 = addNewRoll(
    'Walnut', 'Vanilla milk', '12'
);
const cartItem3 = addNewRoll(
    'Raisin', 'Sugar milk', '3'
);
const cartItem4 = addNewRoll(
    'Apple', 'Keep original', '3'
);

let totalPrice = 0;

for (const cartItem of cartSet) {
    console.log(cartItem);
    createElement(cartItem);
    totalPrice += cartItem.calculatedPrice;
    cartPrice = document.querySelector('.cartTotalPrice');
    cartPrice.innerText = totalPrice.toFixed(2);
  }


/**access the roll
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const chosenRoll = params.get('roll');*/

/**update header
const headerElement = document.querySelector('.sub-title');
const rollImage = document.querySelector('#roll-img');
if (chosenRoll !== null){
    headerElement.innerText = rolls[chosenRoll].name;
    rollImage.src = '../assets/products/' + rolls[chosenRoll].imageFile;
}*/

/**update image
function onSelectGlazingChange(event){
    let glazingIndex = parseInt(event.target.value);
    let glazingChosen = allGlazings[glazingIndex];
    currentGlazingPrice = basePrice + glazingChosen.price;
    displayPrice();
}

function onSelectPackSizeChange(event){
    let packSizeIndex = parseInt(event.target.value);
    let packSizeChosen = allPackSizes[packSizeIndex];
    currentPackSizePriceAdaptation = packSizeChosen.priceAdaptation;
    displayPrice();
}

function displayPrice(){
    let priceElement = document.querySelector('#totalPrice');
    let totalPrice = currentGlazingPrice * currentPackSizePriceAdaptation;
    priceElement.innerText = '$' + totalPrice.toFixed(2);
}

let basePrice = rolls[chosenRoll].basePrice;
let currentGlazingPrice = allGlazings[0].price + basePrice;
let currentPackSizePriceAdaptation = allPackSizes[0].priceAdaptation;
displayPrice();

let glazing = document.querySelector('.glazingMenu');
let size = document.querySelector('.packSizeMenu');
glazing.addEventListener('change', onSelectGlazingChange);
size.addEventListener('change', onSelectPackSizeChange);
let cart = [];

function onClickButton(event){
    let rollType = rolls[chosenRoll].name;
    let rollGlazing = glazing;
    let packSize = size;
    let basePrice = rolls[chosenRoll].basePrice;

    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(newRoll);
    console.log(cart);
}
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', onClickButton); 
*/