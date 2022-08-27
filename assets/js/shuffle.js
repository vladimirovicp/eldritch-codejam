import greenCardsAssets from '../../data/mythicCards/green/index.js';
import brownCardsAssets from '../../data/mythicCards/brown/index.js';
import blueCardsAssets from '../../data/mythicCards/blue/index.js';

export default function shuffle(numberCard,difficulty) {

    let cards = {
        green: [],
        brown: [],
        blue: []
    };

    const cardsStage = {};

        cards.green = shuffleTrue(selectionDifficulty(greenCardsAssets,numberCard,difficulty));
        cards.brown = shuffleTrue(selectionDifficulty(brownCardsAssets,numberCard,difficulty));
        cards.blue  = shuffleTrue(selectionDifficulty(blueCardsAssets,numberCard,difficulty));

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

    return cardsStage;

}

    function selectionDifficulty(cardsAssets,numberCard,difficulty){
        let mainCard = [];

        // Очень легкий уровень сложности: из набора берутся все карты со снежинками, если карт не хватает то добираются обычные карты
        // easy - снежинки
        // normal - обычные карты

        // Легкий уровень сложности: из набора убираются карты с щупальцами
        // hard

        // Средний уровень сложности: набор остается нетронутым

        // Высокий уровень сложности: из набора убираются карты со снежинками
        // easy - снежинки

        // Очень высокий уровень сложности: из набора берутся все карты со щупальцами, если карт не хватает то добираются обычные карты
        // hard

        switch (difficulty){
            case 'very-easy': {
                for (let key in cardsAssets) {
                    if (cardsAssets[key].difficulty === 'easy'){
                        mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color });
                    }
                }
            }
            break;
            case 'easy': {
                for (let key in cardsAssets) {
                    if (cardsAssets[key].difficulty !== 'hard'){
                        mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color });
                    }
                }
            }
            break;
            case 'normal': {
                for (let key in cardsAssets) {
                        mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color });
                }
            }
            break;
            case 'hard': {
                for (let key in cardsAssets) {
                    if (cardsAssets[key].difficulty !== 'easy'){
                        mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color });
                    }
                }
            }
            break;
            case 'very-hard': {
                for (let key in cardsAssets) {
                    if (cardsAssets[key].difficulty === 'hard'){
                        mainCard.push({id: cardsAssets[key].id,cardFace: cardsAssets[key].cardFace,difficulty: cardsAssets[key].difficulty,color: cardsAssets[key].color });
                    }
                }
            }
                break;
            default: console.log( 'Не определена сложность!');
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

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    // }

    function shuffleTrue(array) {

        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }