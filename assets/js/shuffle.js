import greenCardsAssets from '../../Data/MythicCards/green/index.js';
import brownCardsAssets from '../../Data/MythicCards/brown/index.js';
import blueCardsAssets from '../../Data/MythicCards/blue/index.js';

export default function shuffle(numberCard,difficulty) {

    //console.log(brownCardsAssets);

    let cards = {
        green: [],
        brown: [],
        blue: []
    };

    const cardsStage = {}



        // 'stage2':  {
        //     id: '',
        //     color: ''
        // },
        // 'stage3':  {
        //     id: '',
        //     color: ''
        // },
    ;

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


        // console.log(selectionVeryEasy(greenCardsAssets,numberCard))
        cards.green = shuffleTrue(selectionVeryEasy(greenCardsAssets,numberCard));
        cards.brown = shuffleTrue(selectionVeryEasy(brownCardsAssets,numberCard));
        cards.blue  = shuffleTrue(selectionVeryEasy(blueCardsAssets,numberCard));

        // console.log(cards);


        for (let i=0; i < 3; i++){
            const stage = [];

            // blue
            for (let j=0; j < numberCard.blueCards['stage' + (i + 1)]; j++){
                stage.push(cards.blue.pop());
            }

            // brown
            for (let j=0; j < numberCard.brownCards['stage' + (i + 1)]; j++){
                stage.push(cards.brown.pop());
            }

            // green
            for (let j=0; j < numberCard.greenCards['stage' + (i + 1)]; j++){
                stage.push(cards.green.pop());
            }
            cardsStage['stage' + (i + 1)] = shuffleTrue(stage);
        }

        // return cardsStage;
    }


    // Легкий уровень сложности: из набора убираются карты с щупальцами
    // hard

    // Средний уровень сложности: набор остается нетронутым

    // Высокий уровень сложности: из набора убираются карты со снежинками

    // Очень высокий уровень сложности: из набора берутся все карты со щупальцами, если карт не хватает то добираются обычные карты
    // hard


    return cardsStage;

}

    function selectionVeryEasy(cardsAssets,numberCard){
        let mainCard = [];

        for (let key in cardsAssets) {
            if (cardsAssets[key].difficulty === 'easy'){
                mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color });
            }
        }

        let numberCardCurrent = parseInt(numberCard[cardsAssets[0].color + 'Cards'].number);
        if(mainCard.length  < numberCardCurrent){
            for (let key in cardsAssets) {
                if (cardsAssets[key].difficulty === 'normal'){

                    mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color});
                    if(mainCard.length  > numberCardCurrent){
                        break;
                    }
                }
            }
        }
        return mainCard;
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function shuffleTrue(array) {

        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }