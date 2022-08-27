import difficulties from '../../data/difficulties.js';  // Уровни сложности
import ancients from '../../data/ancients.js';

import shuffle from './shuffle.js';

const ancientsContainer = document.querySelector('.ancients');
const difficultyContainer = document.querySelector('.difficulty');
const deckContainer = document.querySelector('.deck');

let difficultyCurrent;
let deckBtn;
let cardBtn;
let currentStage = 1;

const game = {
    ancients: 'cthulhu',
    ancientsIndex: 0,
    difficulty: 'very-easy',
}

const variables = {
    colorCards:['greenCards','brownCards','blueCards'],
    stageTitle: ['Первая стадия','Вторая стадия','Третья стадия'],
    stageName: ['firstStage','secondStage','thirdStage'],
}


function ancientsItem(){
    ancients.forEach(el =>{
        let div = document.createElement('div');
        div.className = "ancients__card";
        let img = document.createElement('img');
        img["src"] =  el.cardFace;
        img["alt"] = el.id;
        div.append(img);
        div.dataset.id = el.id;
        ancientsContainer.appendChild(div);
    });
}
ancientsItem();

const ancientsCard = ancientsContainer.querySelectorAll('.ancients__card[data-id]');

if (ancientsCard.length > 0){
    ancientsCard.forEach(ancientsSelected => {
        ancientsSelected.addEventListener("click", ancientsCardClick);
    });
}

function ancientsCardClick(e){
    const targetAncients = e.currentTarget;
    game.ancients = targetAncients.dataset.id;
    game.ancientsIndex = ancients.findIndex(ancients => ancients.id === game.ancients);
    currentStage = 1;
    deckContainer.innerHTML = '';

    ancientsCard .forEach(el =>{
        el.dataset.id === game.ancients ? el.classList.add('active') : el.classList.remove('active');

    });

    difficulty();
}


function difficulty(){
    difficultyContainer.innerHTML = '<h2>Сложность:</h2>';
    difficulties.forEach(el =>{
        let div = document.createElement('div');
        div.className = "difficulty__item";

        // if (el.id === game.difficulty){div.classList.add('active')}
        div.dataset.id = el.id;
        div.textContent = el.name;
        difficultyContainer.appendChild(div);
    });

    difficultyCurrent = difficultyContainer.querySelectorAll('.difficulty__item[data-id]');
    if (difficultyCurrent.length > 0){
        difficultyCurrent.forEach( difficultySelected => {
            difficultySelected.addEventListener("click",  difficultyCardClick);
        });
    }

}

// difficulty()


function difficultyCardClick(e){
    const targetDifficulty = e.currentTarget;
    const idDifficulty = targetDifficulty.dataset.id;
    game.difficulty = idDifficulty;
    currentStage = 1;
    difficultyCurrent.forEach(el =>{
        el.dataset.id === idDifficulty ? el.classList.add('active') : el.classList.remove('active');

    });
    deck();
}


function deck(){
    deckContainer.innerHTML = '';
    let span = document.createElement('span');
    span.className = "shuffle-button";
    span.textContent ='Замешать колоду';
    deckContainer.appendChild(span);
    deckBtn = deckContainer.querySelector('.shuffle-button');
    deckBtn.addEventListener('click', deckClick);
}

// deck();

function deckClick(){

    let numberCard = {
        greenCards: {
            number: 0,
            stage1: 0,
            stage2: 0,
            stage3: 0,
        },
        brownCards: {
            number: 0,
            stage1: 0,
            stage2: 0,
            stage3: 0,
        },
        blueCards: {
            number: 0,
            stage1: 0,
            stage2: 0,
            stage3: 0,
        }
    }

    deckContainer.innerHTML = '';
    let state = document.createElement('div');
    state.className = "deck__state-container";
    for (let i=0; i<3; i++){
        let stateDotContainer = document.createElement('div');
        stateDotContainer.className = 'deck__state';

        let span = document.createElement('span');
        span.className = "deck__state-text";
        span.textContent= variables.stageTitle[i];
        stateDotContainer.appendChild(span);

        let stateDot = document.createElement('div');
        stateDot.className = "deck__dot-container";

        for (let j=0; j<3; j++){
            let divInfo = document.createElement('div');
            divInfo.className = "deck__dot";
            divInfo.classList.add(variables.colorCards[j]);
            divInfo.textContent = ancients[game.ancientsIndex][variables.stageName[i]][variables.colorCards[j]];

            numberCard[variables.colorCards[j]].number += ancients[game.ancientsIndex][variables.stageName[i]][variables.colorCards[j]];
            numberCard[variables.colorCards[j]]['stage'+ (i+1)] = ancients[game.ancientsIndex][variables.stageName[i]][variables.colorCards[j]];

            stateDot.appendChild(divInfo);
        }
        stateDotContainer.appendChild(stateDot);
        state.appendChild(stateDotContainer);
    }

    const mainCards = shuffle(numberCard,game.difficulty);
    deckContainer.appendChild(state);

    let backSideCard = document.createElement('div');
    backSideCard.className = 'deck__card-back';
    let backSideCardImg = document.createElement('img');
    backSideCardImg["src"] =  './assets/mythicCardBackground.png';
    backSideCard.append(backSideCardImg);
    deckContainer.appendChild(backSideCard);

    cardBtn = deckContainer.querySelector('.deck__card-back');
    cardBtn.addEventListener('click', ()=> cardClick(mainCards));
}

function cardClick(mainCards){
    if (currentStage === 4){
        alert('final!');
        return null;
    }

    if (mainCards['stage' + currentStage].length === 0){
        currentStage++;
    }

    if (currentStage === 4){
        alert('final!');
        return null;
    }


    const currentCard = mainCards['stage' + currentStage].pop();
    let frontSideCard;
    if(deckContainer.querySelector('.deck__card-front')){
        frontSideCard = deckContainer.querySelector('.deck__card-front');
        deckContainer.querySelector('.deck__card-front').innerHTML = ''
    } else {
        frontSideCard = document.createElement('div');
        frontSideCard.className = 'deck__card-front';
    }

    const deckState = deckContainer.querySelectorAll('.deck__state');
    let dot = deckState[currentStage - 1].querySelector('.' + currentCard.color + 'Cards');
    dot.textContent = dot.textContent - 1;


    let frontSideCardImg = document.createElement('img');
    frontSideCardImg["src"] =  currentCard.cardFace;
    frontSideCard.append(frontSideCardImg);
    deckContainer.append(frontSideCard);
}


console.log('Приветствую!\nБлагодарю за проверку!\n')







