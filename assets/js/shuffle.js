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

    let cardsStage = {
        'stage1':  [],
    }



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
        cardsId.green = shuffleTrue(selectionVeryEasy(greenCardsAssets,numberCard));
        cardsId.brown = shuffleTrue(selectionVeryEasy(brownCardsAssets,numberCard));
        cardsId.blue  = shuffleTrue(selectionVeryEasy(blueCardsAssets,numberCard));


        // console.log(cardsStage[0]['stage1'])
        // cardsStage.stage1[0].id.push(10);
        // cardsStage.stage1[0] = {id: '20'};
        // cardsStage.stage1[1] = {id: '30'};
        // cardsStage

        // stage1

        for (let i=0; i < 3; i++){

            // cardsStage['stage' + i] =

            console.log('stage', i + 1);

            console.log(numberCard.blueCards['stage' + (i + 1)]);

            let stage = [];

            // for (let j=0; j < numberCard.blueCards['stage' + (i + 1)]; j++){
            for (let j=0; j < 3; j++){

                    stage.push({id: '20', color: 'red'});

                    // cardsStage['stage' + i].id.push('1') ;  //cardsId.green.pop()
                    // cardsStage['stage' + i + 1] = {id: '123'};


                }
            console.log(stage);
            }



            // console.log(cardsStage);

        }




        // console.log(cardsId.green);
        // console.log(cardsId.brown);
        // console.log(cardsId.blue);
        //
        // console.log(numberCard)



        // console.log(numberCard.greenCards.number);
        // console.log('length',cardsId.green.length)
        // console.log(cardsId.green)

        // for (let i=0; i < numberCard.greenCards.number; i++){
        //     //console.log(cardsId.green)
        //     //console.log(cardsId.green.pop())
        //
        //     console.log(getRandomInt(0, cardsId.green.length))
        //
        //     shuffleGreen[getRandomInt(0, cardsId.green.length)] = cardsId.green.pop();
        //
        // }

        // console.log(shuffleGreen);



    // }

    // Легкий уровень сложности: из набора убираются карты с щупальцами
    // hard

    // Средний уровень сложности: набор остается нетронутым

    // Высокий уровень сложности: из набора убираются карты со снежинками

    // Очень высокий уровень сложности: из набора берутся все карты со щупальцами, если карт не хватает то добираются обычные карты
    // hard

}

    function selectionVeryEasy(cardsAssets,numberCard){
        let mainCardID = []

        for (let key in cardsAssets) {
            if (cardsAssets[key].difficulty === 'easy'){
                mainCardID.push(cardsAssets[key].id);
            }
        }

        let numberCardCurrent = parseInt(numberCard[cardsAssets[0].color + 'Cards'].number);
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