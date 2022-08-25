import greenCardsAssets from '../../Data/MythicCards/green/index.js';
import brownCardsAssets from '../../Data/MythicCards/brown/index.js';
import blueCardsAssets from '../../Data/MythicCards/blue/index.js';

export default function shuffle(numberCard,difficulty) {

    //console.log(brownCardsAssets);

    let cardsId = {
        green: [],
        brown: [],
        blue: []
    };

    switch (difficulty){
        // case 'very-easy': console.log( 'Уровень сложности: very-easy');
        case 'very-easy': shuffleVeryEasy();
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

    // console.log('shuffle 555');


    function shuffleVeryEasy(){

        // Очень легкий уровень сложности: из набора берутся все карты со снежинками, если карт не хватает то добираются обычные карты
        // easy - снежинки
        // normal - обычные карты

        cardsId.green = selectionVeryEasy(greenCardsAssets,numberCard);
        cardsId.brown = selectionVeryEasy(brownCardsAssets,numberCard);
        cardsId.blue = selectionVeryEasy(blueCardsAssets,numberCard);

        console.log(cardsId.green);
        console.log(cardsId.brown);
        console.log(cardsId.blue);


        // console.log(numberCard);

    }

    // Легкий уровень сложности: из набора убираются карты с щупальцами
    // hard

    // Средний уровень сложности: набор остается нетронутым

    // Высокий уровень сложности: из набора убираются карты со снежинками

    // Очень высокий уровень сложности: из набора берутся все карты со щупальцами, если карт не хватает то добираются обычные карты
    // hard

}

    function selectionVeryEasy(cardsAssets,numberCard){
        let mainCardID = []

        // console.log(cardsAssets);

        for (let key in cardsAssets) {
            if (cardsAssets[key].difficulty === 'easy'){
                mainCardID.push(cardsAssets[key].id);
            }
        }
        
        // console.log(numberCard[cardsAssets[0].color + 'Cards'].number);
        // console.log(cardsAssets[0].color)

        let numberCardCurrent = parseInt(numberCard[cardsAssets[0].color + 'Cards'].number);
        console.log(typeof numberCardCurrent)

        console.log(numberCardCurrent, mainCardID.length)

        if(mainCardID.length  < numberCardCurrent){
            for (let key in cardsAssets) {
                if (cardsAssets[key].difficulty === 'normal'){

                    mainCardID.push(cardsAssets[key].id);
                    if(mainCardID.length  > numberCardCurrent){
                        break;
                    }
                }
            }
        }
        return mainCardID;
    }