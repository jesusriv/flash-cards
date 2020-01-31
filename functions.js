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
    closeCardForm;
    
    if (localStorage.getItem('all') && !all) {
        all = [...JSON.parse(localStorage.getItem('all'))];
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
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('all-sets').style.display = 'flex';
    } else if (all) {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('all-sets').style.display = 'flex';
    }

    if (!all) return;
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