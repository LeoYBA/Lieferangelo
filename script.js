let names = [];
let prices = [];
let amounts = [];

function show() {
    let button = document.getElementById('checkoutButtonFull');
    button.style.display = 'none';
}

function addToBasked(name, price, amount) {
    let index = getMenuIndex(name);
    if (index == -1) { // bei einem leeren Array starten wir bei -1
        names.push(name);
        prices.push(price);
        if (amount >= 10) {
            amounts.push(10); // Maximalwert 10
        } else {
            amounts.push(amount);
        }
    } else {
        if (amounts[index] < 10) { // Maximalwert prüfen
            amounts[index]++; // Erhöhe Menge um 1
        }
    }
    shoppingBasket();
}

function getMenuIndex(menu) {
    return names.indexOf(menu); // so bekommt man nur den Index von einem spezifischem Array
}

function shoppingBasket() {
    let element = document.getElementById('shoppingCheckoutPrices');
    element.innerHTML = ''; // Clear vorherige Inhalte
    let sum = 0;

    for (let i = 0; i < names.length; i++) {
        sum += prices[i] * amounts[i];
    }

    if (names.length === 0) {
        // Wenn der Warenkorb leer ist, setzen Sie die Summen auf 0
        document.getElementById('finalSum').innerHTML = '0€';
        document.getElementById('sum').innerHTML = '0€';
    } else {
        let finalSum = sum + 5 + '€'; // Summe mit Zusatz
        let sumWithout = 5 + '€'; // Summe ohne Zusatz

        document.getElementById('finalSum').innerHTML = finalSum;
        document.getElementById('sum').innerHTML = sumWithout;
    }

    // Aufbau des HTML-Inhalts für die Warenkorbliste
    for (let i = 0; i < names.length; i++) {
        let totalProductPrice = prices[i] * amounts[i];
        element.innerHTML += `
            <div class="checkout-foodpricelist">
                <p class="checkout-foodpricelist-fontdesign">${names[i]}</p>
                <div id="checkoutFoodBasket" class="checkout-foodpriceicons-container">
                    <image class="checkout-foodpricelist-plusandminus" onclick="subtractAmount(${i})" src="./minus.png" alt="stars">
                    <p class="checkout-foodpricelist-amount">${amounts[i]}</p>
                    <image class="checkout-foodpricelist-plusandminus" onclick="addAmount(${i})" src="./plus.png" alt="stars">
                </div>
                <p class="checkout-foodpricelist-fontdesign">${totalProductPrice.toFixed(2)}€</p>
            </div>`;
    }

    removeDiv();
}

function addAmount(i) {
    if (amounts[i] < 10) { // Prüfen, ob die Menge kleiner als 10 ist
        amounts[i]++;
        shoppingBasket(); // Warenkorb neu rendern
    }
}

function subtractAmount(i) {
    if (amounts[i] > 1) { // Prüfen, ob die Menge größer als 1 ist
        amounts[i]--;
    } else {
        // Wenn die Menge kleiner oder gleich 1 ist, entfernen Sie das Produkt aus dem Warenkorb
        names.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
    }
    shoppingBasket(); // Warenkorb neu rendern
}



function removeDiv() {
    let div = document.getElementById('CheckoutMinpriceText');
    div.style.display = 'none';
    
    let div2 = document.getElementById('foodbaskedEmptybasked');
    div2.style.display = 'none';

    let div3 = document.getElementById('CheckoutButton');
    div3.style.display = 'none';

    addDiv();
}

function addDiv() {
    let button = document.getElementById('checkoutButtonFull');
    button.style.display = 'block'; // Setzen Sie den Anzeigewert auf 'block', um das Element sichtbar zu machen
}









function adjustLayout() {
    if (window.innerWidth < 1050) {
        let emptyBasketElement = document.getElementById('foodBasketMainContainer');
        if (emptyBasketElement) {
            emptyBasketElement.style.display = 'none';
        }
    } else {
        let emptyBasketElement = document.getElementById('foodBasketMainContainer');
        if (emptyBasketElement) {
            emptyBasketElement.style.display = 'block';
        }
    }
}


function myFunction() {

    if (window.innerWidth < 1050) {
    var element = document.getElementById("maincontainer-foodbaskedandfoodcard");
    element.classList.remove("maincontainer-foodbaskedandfoodcard");
  }
}


// Solution 2: Add button to show hidden element if screen width falls below 1050px
function addButton() {
    if (window.innerWidth < 1050) {
        let buttonContainer = document.getElementById('buttonContainer');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.id = 'buttonContainer';
            document.body.appendChild(buttonContainer);
        }
        buttonContainer.innerHTML = '<button onclick="showElement()">Show Basket</button>';
    } else {
        let buttonContainer = document.getElementById('buttonContainer');
        if (buttonContainer) {
            buttonContainer.innerHTML = '';
        }
    }
}

// Solution 3: Adjust max-width for specific elements when screen width falls below 1050px
function adjustMaxWidth() {
    if (window.innerWidth < 1050) {
        let elements = document.querySelectorAll('.food-basked-container, .foodcard-ordercontainer, .container-searchbar, .maincontainer-foodbaskedandfoodcard, .contentsection-pizza-image, .header-menu-container');
        elements.forEach(element => {
            element.style.maxWidth = '1920px';
        });
    } else {
        let elements = document.querySelectorAll('.food-basked-container, .foodcard-ordercontainer, .container-searchbar, .maincontainer-foodbaskedandfoodcard, .contentsection-pizza-image, .header-menu-container');
        elements.forEach(element => {
            element.style.maxWidth = 'initial';
        });
    }
}

// Call the functions initially and add event listeners for window resize
window.addEventListener('DOMContentLoaded', () => {
    adjustLayout();
    addButton();
    adjustMaxWidth();
});

window.addEventListener('resize', () => {
    adjustLayout();
    addButton();
    adjustMaxWidth();
});

// Function to show the hidden element
function showElement() {
    let emptyBasketElement = document.getElementById('foodBasketMainContainer');
    if (emptyBasketElement) {
        emptyBasketElement.style.display = 'block';
    }
}





