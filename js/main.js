let currentSet;
let all;
let allSet = false;
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

const extractSet = (data) => {
    currentSet = new CardSet(data.name);
    for (let i = 0; i < data.cards.length; i++) {
        currentSet.addCard(data.cards[i].title, data.cards[i].body);
    }
    currentSet.displayDeck(0);

    document.getElementById('next').addEventListener('click', next);
    document.getElementById('prev').addEventListener('click', prev);

    if (localStorage.getItem('all')) {
        all = [...JSON.parse(localStorage.getItem('all'))];
    }
}

const closeSetForm = () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('submitSet').style.display = 'none';
    document.querySelector('.submit-set').style.display = 'none';
}

const closeCardForm = () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('add-to-set').style.display = 'none';
    document.querySelector('.add-card').style.display = 'none';
}

const closeAllSetList = () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('all-sets').style.display = 'none';
}

const add = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('submitSet').style.display = 'flex';
    document.querySelector('.submit-set').style.display = 'flex';

    closeCardForm;
    closeAllSetList;
}

const addToSet = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('add-to-set').style.display = 'flex';
    document.querySelector('.add-card').style.display = 'flex';

    closeSetForm;
    closeAllSetList;
}

const viewAll = () => {
    closeCardForm;
    closeSetForm;
    if (localStorage.getItem('all') && !all) {
        all = [...JSON.parse(localStorage.getItem('all'))];
    
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('all-sets').style.display = 'flex';
    } else if (all) {
        if (!allSet) {
            document.getElementById('bottom').innerHTML = "";
            for (let i = 0; i < all.length; i++) {
                if (all[i].name == currentSet.name) {
                    document.getElementById('bottom').innerHTML += 
                        `<div class="list">
                            <p class="list-title">${all[i].name}</p>
                            <label class="switch">
                                <input id='${i}' type="checkbox" checked />
                                <span onclick="toggleBtn()"a class="slider round"></span>
                            </label>
                        </div>`
                } else {
                    document.getElementById('bottom').innerHTML += 
                        `<div class="list">
                            <p class="list-title">${all[i].name}</p>
                            <label class="switch">
                                <input id='${i}' type="checkbox" />
                                <span onclick="toggleBtn()" class="slider round"></span>
                            </label>
                        </div>`
                }
            }
            allSet = true;
        }
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('all-sets').style.display = 'flex';
    }

    if (!all) return;
}

const toggleBtn = () => {
    const selected = event.srcElement.previousElementSibling.id;
    if (event.srcElement.previousElementSibling.checked) {
        return;
    } else {
        for (let i = 0; i < all.length; i++) {
            if (i !== selected) {
                document.getElementById(`${i}`).checked = false;
            } 
        }
        extractSet(all[selected]);
    }
}

const next = () => {
    if (currentSet.currentCard < currentSet.cards.length) {
        currentSet.currentCard += 1;
        document.querySelector('.front').innerHTML = currentSet.cards[currentSet.currentCard - 1].title;
        document.querySelector('.back').innerHTML = currentSet.cards[currentSet.currentCard - 1].body;
        currentSet.displayCardCount(currentSet.currentCard);
    }
}

const prev = () => {
    if (currentSet.currentCard > 1) {
        currentSet.currentCard -= 1;
        document.querySelector('.front').innerHTML = currentSet.cards[currentSet.currentCard - 1].title;
        document.querySelector('.back').innerHTML = currentSet.cards[currentSet.currentCard - 1].body;
        currentSet.displayCardCount(currentSet.currentCard);
    }
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
    
    if (all) {
        all.push(currentSet);
        localStorage.setItem('all', JSON.stringify(all));
        allSet = false;
    } else if (localStorage.getItem('all')) {
        all = [...JSON.parse(localStorage.getItem('all'))];
        all.push(currentSet);
        localStorage.setItem('all', JSON.stringify(all));
        console.log(all);
    } else {
        all = [];
        all.push(currentSet);
        localStorage.setItem('all', JSON.stringify(all));
    }
    
    closeSetForm();
    document.getElementById('welcome').style.display = 'none';
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

    closeSetForm();
    closeCardForm();
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
});

if (localStorage.getItem('default')) {
    document.getElementById('set').style.display = "flex";
    const setName = localStorage.getItem("default")
    extractSet(JSON.parse(localStorage.getItem(setName)));
    document.getElementById('welcome').style.display = 'none';

}