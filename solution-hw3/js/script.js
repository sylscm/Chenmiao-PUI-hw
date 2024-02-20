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

let basePrice = 2.49;
let currentGlazingPrice = allGlazings[0].price + basePrice;
let currentPackSizePriceAdaptation = allPackSizes[0].priceAdaptation;
displayPrice();

let glazing = document.querySelector('.glazingMenu');
let size = document.querySelector('.packSizeMenu');
glazing.addEventListener('change', onSelectGlazingChange);
size.addEventListener('change', onSelectPackSizeChange);