let currentSet;
let all;
class CardSet {
    
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.totalCards;
        this.cardCount;
        this.currentCard;
    }

    addCard(title, body) {
        let card = new FlashCard(title, body);
        this.cards.push(card);
    }

    displayDeck() {
        document.querySelector('#set-title').innerHTML = this.name;
        document.querySelector('.front').innerHTML = this.cards[0].title;
        document.querySelector('.back').innerHTML = this.cards[0].body;

        this.displayCardCount(1);
    }

    displayCardCount(position) {
        this.currentCard = position;
        this.totalCards = this.cards.length;
        this.cardCount = `${this.currentCard}/${this.totalCards}`;
        document.getElementById('card-count').innerHTML = this.cardCount;
    }
    
}

class FlashCard {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }
}

function flip() {
    document.getElementById('card').classList.toggle('flipped');
}

const add = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('submitSet').style.display = 'flex';
    document.querySelector('.submit-set').style.display = 'flex';
}

const addToSet = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('add-to-set').style.display = 'flex';
    document.querySelector('.add-card').style.display = 'flex';

    document.getElementById('submitSet').style.display = 'none';
    document.querySelector('.submit-set').style.display = 'none';
}

const viewAll = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('all-sets').style.display = 'flex';
    if (localStorage.getItem('all') && !all) {
        all = [...JSON.parse(localStorage.getItem('all'))];
    }
    if (all) {
        console.log(all);
        for (let i = 0; i < all.length; i++) {
            document.getElementById('all-sets').innerHTML += 
            `<div class="list">
                <p class="list-title">${all[i].name}</p>
                <div class="toggle">
                    <button id="toggle-btn"></button>
                </div>
             </div>`
        }
    }
}

document.querySelector('.exit').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('submitSet').style.display = 'none';
    document.querySelector('.submit-set').style.display = 'none';
});

document.querySelector('.exit-form').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('add-to-set').style.display = 'none';
    document.querySelector('.add-card').style.display = 'none';
});

document.getElementById('submitSet').addEventListener('submit', (e) => {
    e.preventDefault();
    const setName = document.getElementById('set-name').value;
    const title = document.getElementById('card-title').value;
    const body = document.getElementById('card-body').value;
    
    currentSet = new CardSet(setName);

    currentSet.addCard(title, body);
    localStorage.setItem(currentSet.name, JSON.stringify(currentSet));
    localStorage.setItem('default', currentSet.name);
    
    if (localStorage.getItem('all')) {
        all = [...JSON.parse(localStorage.getItem('all'))];
        all.push(currentSet);
        localStorage.setItem('all', JSON.stringify(all));
    } else {
        all = [];
        all.push(currentSet);
        localStorage.setItem('all', JSON.stringify(all));
    }

    document.getElementById('modal').style.display = 'none';
    document.getElementById('submitSet').style.display = 'none';
    document.getElementById('set').style.display = "flex";
    
    currentSet.displayDeck();

    document.getElementById('set-name').value = '';
    document.getElementById('card-title').value = '';
    document.getElementById('card-body').value = '';
})

document.getElementById('add-to-set').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    currentSet.addCard(title, body);
    currentSet.displayCardCount(currentSet.cards.length);
    
    document.getElementById('next').addEventListener('click', () => {
        if (currentSet.currentCard < currentSet.cards.length) {
            currentSet.currentCard += 1;
            document.querySelector('.front').innerHTML = currentSet.cards[currentSet.currentCard - 1].title;
            document.querySelector('.back').innerHTML = currentSet.cards[currentSet.currentCard - 1].body;
            currentSet.displayCardCount(currentSet.currentCard);
        }
    });


    document.getElementById('prev').addEventListener('click', () => {
        if (currentSet.currentCard > 1) {
            currentSet.currentCard -= 1;
            document.querySelector('.front').innerHTML = currentSet.cards[currentSet.currentCard - 1].title;
            document.querySelector('.back').innerHTML = currentSet.cards[currentSet.currentCard - 1].body;
            currentSet.displayCardCount(currentSet.currentCard);
        }
    });

    localStorage.setItem(currentSet.name, JSON.stringify(currentSet));

    document.getElementById('modal').style.display = 'none';
    document.getElementById('add-to-set').style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
});

const extractSet = (data) => {
    currentSet = new CardSet(data.name);
    for (let i = 0; i < data.cards.length; i++) {
        currentSet.addCard(data.cards[i].title, data.cards[i].body);
    }
    currentSet.displayDeck();

    document.getElementById('next').addEventListener('click', () => {
        if (currentSet.currentCard < currentSet.cards.length) {
            currentSet.currentCard += 1;
            document.querySelector('.front').innerHTML = currentSet.cards[currentSet.currentCard - 1].title;
            document.querySelector('.back').innerHTML = currentSet.cards[currentSet.currentCard - 1].body;
            currentSet.displayCardCount(currentSet.currentCard);
        }
    });


    document.getElementById('prev').addEventListener('click', () => {
        if (currentSet.currentCard > 1) {
            currentSet.currentCard -= 1;
            document.querySelector('.front').innerHTML = currentSet.cards[currentSet.currentCard - 1].title;
            document.querySelector('.back').innerHTML = currentSet.cards[currentSet.currentCard - 1].body;
            currentSet.displayCardCount(currentSet.currentCard);
        }
    });
}

if (localStorage.getItem('default')) {
    document.getElementById('set').style.display = "flex";
    const setName = localStorage.getItem("default")
    console.log(setName);
    extractSet(JSON.parse(localStorage.getItem(setName)));
}