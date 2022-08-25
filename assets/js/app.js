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

    switch (game.difficulty){
        // case 'very-easy': console.log( 'Уровень сложности: very-easy');
        case 'very-easy': shuffle();
            break;
        case 'easy': console.log( 'Уровень сложности: easy');
            break;
        case 'normal': console.log( 'Уровень сложности: normal');
            break;
        case 'hard': console.log( 'Уровень сложности: hard');
            break;
        case 'very-hard': console.log( 'Уровень сложности: very-hard');
            break;
        default: console.log( 'Не определена сложность!');
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

            stateDot.appendChild(divInfo);
        }
        stateDotContainer.appendChild(stateDot);
        state.appendChild(stateDotContainer);
    }

    deckContainer.appendChild(state);


    let backSideCard = document.createElement('div');
    backSideCard.className = 'deck__card-back';
    let backSideCardImg = document.createElement('img');
    backSideCardImg["src"] =  './assets/mythicCardBackground.png';
    backSideCard.append(backSideCardImg);
    deckContainer.appendChild(backSideCard);

    cardBtn = deckContainer.querySelector('.deck__card-back');
    cardBtn.addEventListener('click', cardClick);
}

// deckClick();

function cardClick(){
    console.log('cardClick');

    let frontSideCard = document.createElement('div');
    frontSideCard.className = 'deck__card-front';
    let frontSideCardImg = document.createElement('img');
    frontSideCardImg["src"] =  './assets/mythicCardBackground.png';
    frontSideCard.append(frontSideCardImg);
    deckContainer.appendChild(frontSideCard);


}







