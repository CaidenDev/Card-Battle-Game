class Fighter {
    constructor(name, power, defense, nationality, queer, species, teacher, pair) {
        this.name = name;
        this.power = power;
        this.defense = defense;
        this.nationality = nationality;
        this.queer = queer;
        this.species = species;
        this.teacher = teacher;
        this.pair = pair;
    }
}

// Initialize the deck with fighters
let deck = [
    new Fighter("Caiden", 3, 3, "Australia", "Yes", "Human", "Yes", "Nico"),
    new Fighter("Nico", 3, 3, "France", "Yes", "Human", "No", "Caiden"),
    new Fighter("Giant Jasmine", 2, 4, "Australia", "Yes", "Human", "Yes", "Anne-Marie Kondom"),
    new Fighter("Anne-Marie Kondom", 2, 4, "France", "Yes", "Human", "Yes", "Giant Jasmine"),
    new Fighter("Adam", 3, 3, "-", "Yes", "Human", "Yes", "Salomé"),
    new Fighter("Salomé", 3, 3, "France", "Yes", "Human", "No", "Adam"),
    new Fighter("Maud", 1, 2, "France", "No", "Human", "No", "Râne"),
    new Fighter("Râne", 3, 3, "France", "No", "Animal", "No", "Maud"),
    new Fighter("Moon", 1, 1, "France", "No", "Animal", "No", "Turtle"),
    new Fighter("Turtle", 1, 1, "France", "No", "Animal", "No", "Moon"),
    new Fighter("Nolwenn", 3, 3, "France", "Yes", "Human", "No", "Louise"),
    new Fighter("Louise", 3, 3, "France", "Yes", "Human", "No", "Nolwenn"),
    new Fighter("Emma", 3, 3, "Australia", "Yes", "Human", "Yes", "Caitlin"),
    new Fighter("Caitlin", 3, 3, "Australia", "Yes", "Human", "No", "Emma"),
    new Fighter("Kat", 2, 2, "Australia", "No", "Human", "No", "Moune"),
    new Fighter("Moune", 2, 2, "France", "No", "Human", "No", "Kat"),
    new Fighter("Martha", 3, 3, "-", "Yes", "Human", "Yes", "-"),
    new Fighter("Eugénie", 3, 3, "France", "No", "Human", "Yes", "-"),
    new Fighter("Anna", 3, 3, "-", "No", "Human", "Yes", "Jason"),    
    new Fighter("Jason", 3, 3, "Australia", "Yes", "Human", "Yes", "Anna")    
];

// Array to hold fighters drawn to the battlefield
let battlefield = [];

// Function to draw a random fighter from the deck
function drawFighter() {
    if (deck.length === 0) {
        alert("No more fighters in the deck!");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck.splice(randomIndex, 1)[0];
}

// Function to update the UI
function updateUI() {
    const playerBattlefield = document.getElementById('player-battlefield');
    playerBattlefield.innerHTML = '';

    battlefield.forEach(fighter => {
        const fighterElem = document.createElement('div');
        fighterElem.classList.add('card');
        fighterElem.dataset.name = fighter.name;
        fighterElem.dataset.power = fighter.power;
        fighterElem.dataset.defense = fighter.defense;
        fighterElem.dataset.nationality = fighter.nationality;
        fighterElem.dataset.queer = fighter.queer;
        fighterElem.dataset.species = fighter.species;
        fighterElem.dataset.teacher = fighter.teacher;
        fighterElem.dataset.pair = fighter.pair;

        fighterElem.innerHTML = `
            <h3>${fighter.name}</h3>
            <p>PWR: <span class="value">${fighter.power}</span></p>
            <p>DEF: <span class="value">${fighter.defense}</span></p>
            <p>Nationality: <span class="value">${fighter.nationality}</span></p>
            <p>Queer: <span class="value">${fighter.queer}</span></p>
            <p>Species: <span class="value">${fighter.species}</span></p>
            <p>Teacher: <span class="value">${fighter.teacher}</span></p>
            <p>Pair: <span class="value">${fighter.pair}</span></p>
        `;
        playerBattlefield.appendChild(fighterElem);
    });
}

// Function to draw initial hand
function drawInitialHand() {
    const hand = [];
    for (let i = 0; i < 3; i++) {
        const drawnFighter = drawFighter();
        if (drawnFighter) {
            hand.push(drawnFighter);
        }
    }
    return hand;
}

// Function to update the hand UI
function updateHandUI(hand) {
    const playerHand = document.getElementById('player-hand');
    playerHand.innerHTML = '';

    hand.forEach((fighter, index) => {
        const fighterElem = document.createElement('div');
        fighterElem.classList.add('hand-card');
        fighterElem.dataset.index = index;

        fighterElem.innerHTML = `
            <h3>${fighter.name}</h3>
            <p>PWR: <span class="value">${fighter.power}</span></p>
            <p>DEF: <span class="value">${fighter.defense}</span></p>
            <p>Nationality: <span class="value">${fighter.nationality}</span></p>
            <p>Queer: <span class="value">${fighter.queer}</span></p>
            <p>Species: <span class="value">${fighter.species}</span></p>
            <p>Teacher: <span class="value">${fighter.teacher}</span></p>
            <p>Pair: <span class="value">${fighter.pair}</span></p>
        `;
        fighterElem.addEventListener('click', () => placeCardOnBattlefield(fighter, index, hand));
        playerHand.appendChild(fighterElem);
    });
}

// Function to place a card on the battlefield
function placeCardOnBattlefield(fighter, index, hand) {
    if (battlefield.length >= 5) {
        alert("You can only have 5 fighters on the battlefield!");
        return;
    }
    battlefield.push(fighter);
    updateUI();
    hand.splice(index, 1);  // Remove the card from hand
    updateHandUI(hand);     // Update the hand UI
}

// Event listener for the draw button
document.getElementById('draw-fighter-button').addEventListener('click', () => {
    const hand = drawInitialHand();
    updateHandUI(hand);
});
