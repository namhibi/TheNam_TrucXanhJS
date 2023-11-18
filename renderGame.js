
const squareSize = '100px';
let score = 10000;
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.backgroundColor='#90AFC5';
document.body.style.height='100vh';

const scoreText = document.createElement('div');
scoreText.style.color = '#2A3132';
scoreText.style.fontSize = '50px';
scoreText.style.fontWeight = 'bold';
scoreText.style.marginTop = '50px';
scoreText.style.fontFamily = "Arial, sans-serif";
updateScoreText();

document.body.appendChild(scoreText);

const container = document.getElementById('container');
container.style.width = '550px';
container.style.height = '450px';
container.style.zIndex = 0;
container.style.backgroundColor = '#336B87';
container.style.borderRadius = '12px';
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🦁', '🦊'];
const cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;
//cards.sort(() => Math.random() - 0.5);
let num = symbols.length * 2;
let count = 1;
cards.forEach((sym) => {
    const card = document.createElement('div');
    card.style.width = squareSize;
    card.style.height = squareSize;
    card.style.margin = '5px';
    card.style.flex = '0 0 calc(20% - 10px)';
    card.style.position = 'relative';
    card.addEventListener('click', flipCard);

    const square = document.createElement('div');
    square.style.width = '100%';
    square.style.height = '100%';
    square.style.borderRadius = '12px';
    square.style.backgroundColor = '#763626';
    square.style.display = 'flex';
    square.style.justifyContent = 'center';
    square.style.alignItems = 'center';
    square.style.zIndex = 2;
    square.style.position = 'absolute';
    square.id = "square";

    const indexText = document.createElement('p');
    indexText.innerHTML = count;
    indexText.style.color = 'white';
    indexText.style.fontSize = '20px';
    indexText.style.fontWeight = 'bold';

    const symbol = document.createElement('div');
    symbol.innerHTML = sym ;
    symbol.style.width = '100%';
    symbol.style.height = '100%';
    symbol.style.fontSize = '60px';
    symbol.style.display = 'flex';
    symbol.style.justifyContent = 'center';
    symbol.style.alignItems = 'center';
    symbol.style.zIndex = 1;
    symbol.style.position = 'absolute';
    symbol.id = "symbol";



    square.appendChild(indexText);
    card.appendChild(square);
    card.appendChild(symbol);
    container.appendChild(card);
    count++;
});


function flipCard() {
    const selectedCard = this;
    const square = selectedCard.querySelector('#square');
    if (flippedCards.length < 2 && !selectedCard.classList.contains('flipped')) {
        selectedCard.classList.add('flipped');
        square.style.visibility = 'hidden';
        flippedCards.push(selectedCard);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}
function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('#symbol').innerText;
    const symbol2 = card2.querySelector('#symbol').innerText;

    if (symbol1 === symbol2) {
        score = updateScore(1000);
        updateScoreText();
        matchedPairs++;
        if (matchedPairs === symbols.length) {
            alert('Congratulations! You matched all pairs.');
            setTimeout(() => {
                location.reload(true);
            }, 2000);
        }
    } else {
        card1.classList.remove('flipped');
        card1.querySelector('#square').style.visibility = 'visible';
        card2.classList.remove('flipped');
        card2.querySelector('#square').style.visibility = 'visible';
        score = updateScore(-500);
        if (score < 0) {
            alert('You lose, Good luck next time!');
            setTimeout(() => {
                location.reload(true);
            }, 2000);
        } else {
            updateScoreText();
        }
    }

    flippedCards = [];
}
function updateScore(newUpdateScore) {
    return score + newUpdateScore;
} function updateScoreText() {
    scoreText.innerHTML ="Coin:"+score;
}