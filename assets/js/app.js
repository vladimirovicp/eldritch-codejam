import difficulties from '../../data/difficulties.js';  // Уровни сложности
import ancients from '../../data/ancients.js';
// import ancientsData from "../../data/ancients.js";

import shuffle from './shuffle.js';



const ancientsContainer = document.querySelector('.ancients');
const difficultyContainer = document.querySelector('.difficulty');
const deckContainer = document.querySelector('.deck');

let difficultyCurrent;
let deckBtn;
let cardBtn;

let currentStage = 1;

//azathoth
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

// console.log(difficulties);
// console.log(ancients);


// let indexAncients = ancients.findIndex(el => el.id === game.ancients);
// console.log(indexAncients);


function ancientsItem(){
    ancients.forEach(el =>{
        // console.log(el.id);
       // console.log(el.name);
       //  console.log(el.cardFace);

        let div = document.createElement('div');
        div.className = "ancients__card";
        let img = document.createElement('img');
        img["src"] =  el.cardFace;
        div.append(img);
        div.dataset.id = el.id;
        ancientsContainer.appendChild(div);

        //game.ancients = el.id;
        //game.ancientsIndex = ancients.findIndex(ancients => ancients.id === game.ancients);

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
    const idAncients = targetAncients.dataset.id;

    game.ancients = idAncients;
    game.ancientsIndex = ancients.findIndex(ancients => ancients.id === game.ancients);
    //console.log(game)
    difficulty();
}


function difficulty(){
    difficultyContainer.innerHTML = '<h2>Сложность:</h2>';
    difficulties.forEach(el =>{
        // console.log(el);
        let div = document.createElement('div');
        div.className = "difficulty__item";

        if (el.id === game.difficulty){div.classList.add('active')}
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

difficulty()


function difficultyCardClick(e){
    const targetDifficulty = e.currentTarget;
    const idDifficulty = targetDifficulty.dataset.id;
    game.difficulty = idDifficulty;
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

deck();

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

            // console.log(variables.colorCards[j],numberCard[variables.colorCards[j]].number);

            stateDot.appendChild(divInfo);
        }
        stateDotContainer.appendChild(stateDot);
        state.appendChild(stateDotContainer);
    }


    // console.log(numberCard);

    const mainCards = shuffle(numberCard,game.difficulty);

    // console.log(mainCards);

    // switch (game.difficulty){
    //     // case 'very-easy': console.log( 'Уровень сложности: very-easy');
    //     case 'very-easy': shuffle();
    //         break;
    //     case 'easy': console.log( 'Уровень сложности: easy');
    //         break;
    //     case 'normal': console.log( 'Уровень сложности: normal');
    //         break;
    //     case 'hard': console.log( 'Уровень сложности: hard');
    //         break;
    //     case 'very-hard': console.log( 'Уровень сложности: very-hard');
    //         break;
    //     default: console.log( 'Не определена сложность!');
    // }



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

// deckClick();

function cardClick(mainCards){
    // console.log(mainCards);
    // console.log(mainCards['stage' + currentStage].length);

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

    // console.log(mainCards['stage' + currentStage]);

    // console.log(mainCards['stage' + currentStage]);
    // console.log('currentStage',currentStage);

    const currentCard = mainCards['stage' + currentStage].pop();

    // console.log(currentCard);
    // console.log(currentCard.color)

    let frontSideCard;
    if(deckContainer.querySelector('.deck__card-front')){
        frontSideCard = deckContainer.querySelector('.deck__card-front');
        deckContainer.querySelector('.deck__card-front').innerHTML = ''
    } else {
        frontSideCard = document.createElement('div');
        frontSideCard.className = 'deck__card-front';
    }

    // switch (currentCard.color){
    //     case 'blue':
    //         break;
    // }

    const deckState = deckContainer.querySelectorAll('.deck__state');
    let dot = deckState[currentStage - 1].querySelector('.' + currentCard.color + 'Cards');

    //currentStage

    // let dot = deckContainer.querySelector('.' + currentCard.color + 'Cards');

    dot.textContent = dot.textContent - 1;

    // if(currentCard.color === 'blue'){
    //
    // }


    let frontSideCardImg = document.createElement('img');
    frontSideCardImg["src"] =  currentCard.cardFace;
    frontSideCard.append(frontSideCardImg);
    deckContainer.append(frontSideCard);

}







