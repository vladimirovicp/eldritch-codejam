import difficulties from '../../data/difficulties.js';  // Уровни сложности
import ancients from '../../data/ancients.js';

const ancientsContainer = document.querySelector('.ancients');
const difficultyContainer = document.querySelector('.difficulty');
const deckContainer = document.querySelector('.deck');

let difficultyCurrent;
let deckBtn;

// console.log(difficulties);
// console.log(ancients);

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
    // console.log(idAncients);

    difficulty();
}


function difficulty(){
    difficultyContainer.innerHTML = '';
    difficulties.forEach(el =>{
        console.log(el);
        let div = document.createElement('div');
        div.className = "difficulty__item";
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
    difficultyCurrent.forEach(el =>{
        el.dataset.id === idDifficulty ? el.classList.add('active') : el.classList.remove('active');
    });
    console.log(idDifficulty);

    deck();
}


function deck(){
    deckContainer.innerHTML = '';
    let span = document.createElement('span');
    span.className = "shuffle-button";
    span.textContent =' Замешать колоду';
    deckContainer.appendChild(span);

    deckBtn = deckContainer.querySelector('.shuffle-button');
    deckBtn.addEventListener('click', deckClick);
}

deck();

function deckClick(){
    console.log('клик')
}







