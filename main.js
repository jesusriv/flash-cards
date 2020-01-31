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

    displayDeck(index) {
        document.querySelector('#set-title').innerHTML = this.name;
        document.querySelector('.front').innerHTML = this.cards[index].title;
        document.querySelector('.back').innerHTML = this.cards[index].body;

        index == 0 ? this.displayCardCount(1) : null;
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

document.querySelector('.exit').addEventListener('click', closeSetForm);
document.querySelector('.exit-form').addEventListener('click', closeCardForm);
document.querySelector('.exit-all').addEventListener('click', closeAllSetList);


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

    closeCardForm;
    closeAllSetList;
    closeSetForm;
    document.getElementById('set').style.display = "flex";
    
    currentSet.displayDeck(0);

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
    currentSet.displayDeck(currentSet.cards.length - 1);
    
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('prev').addEventListener('click', prev);

    localStorage.setItem(currentSet.name, JSON.stringify(currentSet));

    closeCardForm;
    closeAllSetList;
    closeSetForm;
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
});

const extractSet = (data) => {
    currentSet = new CardSet(data.name);
    for (let i = 0; i < data.cards.length; i++) {
        currentSet.addCard(data.cards[i].title, data.cards[i].body);
    }
    currentSet.displayDeck(0);

    document.getElementById('next').addEventListener('click', next);


    document.getElementById('prev').addEventListener('click', prev);
}

if (localStorage.getItem('default')) {
    document.getElementById('set').style.display = "flex";
    const setName = localStorage.getItem("default")
    extractSet(JSON.parse(localStorage.getItem(setName)));
}