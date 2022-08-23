import difficulties from '../../data/difficulties.js';  // Уровни сложности
import ancients from '../../data/ancients.js';

const ancientsContainer = document.querySelector('.ancients');

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

    console.log(idAncients);
}
