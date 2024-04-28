const recipeSet = new Set();

class Recipe {
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
    if (template !== null){
        const clone = template.content.cloneNode(true);
        newRoll.element = clone.querySelector('.cartContainer');
        const btnDelete = newRoll.element.querySelector('.remove');
        btnDelete.addEventListener('click', () => {
        deleteRoll(newRoll);
        });

        const CartSetElement = document.querySelector('.cartContent');
        CartSetElement.prepend(newRoll.element);
        updateElement(newRoll);
    }
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
    console.log(cartSet)
    cartPrice.innerText = totalPrice.toFixed(2);
    saveToLocalStorage()
    updateCartBadge();
  }

let totalPrice = 0;

if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
    updateCartBadge();
} 

function saveToLocalStorage() {
    const rollArray = Array.from(cartSet);
    const rollArrayString = JSON.stringify(rollArray);
    localStorage.setItem('storedRolls', rollArrayString);
}




function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    const rollArray = JSON.parse(rollArrayString);
    console.log(rollArray)
    for (const rollData of rollArray) {
        const roll = addNewRoll(rollData.type, rollData.glazing,
            rollData.size);
        createElement(roll);
        totalPrice += roll.calculatedPrice;
        cartPrice = document.querySelector('.cartTotalPrice');
        if (cartPrice !== null){
            cartPrice.innerText = totalPrice.toFixed(2);
        }
    }
  }

function updateCartBadge() {
    const cartBadge = document.querySelector('.cartBadge');
    console.log(cartSet.size)
    cartBadge.innerText = cartSet.size;
}

if (window.location.href.includes('original.html')) {

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const chosenRoll = params.get('roll')
    
    /**update header*/
    const headerElement = document.querySelector('.sub-title');
    /**update image*/
    const rollImage = document.querySelector('#roll-img');
    if (chosenRoll !== null){
        headerElement.innerText = rolls[chosenRoll].name;
        rollImage.src = '../assets/products/' + rolls[chosenRoll].imageFile;
    }
    
    let basePrice = rolls[chosenRoll].basePrice;
    let currentGlazingPrice = allGlazings[0].price + basePrice;
    let currentPackSizePriceAdaptation = allPackSizes[0].priceAdaptation;
    displayPrice();
    
    let glazing = document.querySelector('.glazingMenu');
    let size = document.querySelector('.packSizeMenu');
    glazing.addEventListener('change', onSelectGlazingChange);
    size.addEventListener('change', onSelectPackSizeChange);
    let selectedGlazing = allGlazings[0].glazing;
    let selectedPackSize = allPackSizes[0].packSize;
    
    function onSelectGlazingChange(event){
        let glazingIndex = parseInt(event.target.value);
        let glazingChosen = allGlazings[glazingIndex];
        selectedGlazing = glazingChosen.glazing;
        currentGlazingPrice = basePrice + glazingChosen.price;
        displayPrice();
    }
    
    function onSelectPackSizeChange(event){
        let packSizeIndex = parseInt(event.target.value);
        let packSizeChosen = allPackSizes[packSizeIndex];
        selectedPackSize = packSizeChosen.packSize;
        currentPackSizePriceAdaptation = packSizeChosen.priceAdaptation;
        displayPrice();
    }
    
    function displayPrice(){
        let priceElement = document.querySelector('#totalPrice');
        let totalPrice = currentGlazingPrice * currentPackSizePriceAdaptation;
        priceElement.innerText = '$' + totalPrice.toFixed(2);
    }
    
    if (localStorage.getItem('storedRolls') != null) {
        retrieveFromLocalStorage();
    } 
    
    class Roll {
        constructor(rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing =  rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
        }
    };
    
    function onClickButton(event){
        let rollType = chosenRoll;
        let rollGlazing = selectedGlazing;
        let packSize = selectedPackSize;
        let basePrice = rolls[chosenRoll].basePrice;
        const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
        cartSet.add(newRoll);
        saveToLocalStorage();
        console.log(cartSet);
        updateCartBadge();
    }
    
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', onClickButton);
}