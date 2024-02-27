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

/**access the roll*/
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const chosenRoll = params.get('roll')
/**update header*/
const headerElement = document.querySelector('.sub-title');
headerElement.innerText = rolls[chosenRoll].name
/**update image*/
const rollImage = document.querySelector('#roll-img');
rollImage.src = '../assets/products/' + rolls[chosenRoll].imageFile;

function onSelectGlazingChange(event){
    let glazingIndex = parseInt(event.target.value);
    let glazingChosen = allGlazings[glazingIndex];
    console.log(glazingChosen)
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

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
};

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

