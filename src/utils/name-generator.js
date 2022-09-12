import {randInt} from "kontra";

var firstNames = [
    'ari', 'amy', 'mary', 'john', 'lisa', 'mark', 'paul', 'james', 'linda', 'david',
    'susan', 'sarah', 'karen', 'nancy', 'betty', 'emily', 'donna', 'carol', 'kevin',
    'brian', 'laura', 'jacob', 'robert', 'joseph', 'thomas', 'daniel', 'sandra', 'donald',
    'ashley', 'steven', 'andrew', 'joshua', 'amanda', 'george', 'pamela', 'michael', 'william',
    'barbara', 'richard', 'jessica', 'charles', 'matthew', 'anthony', 'kenneth', 'dorothy',
    'melissa', 'timothy', 'deborah', 'stephen', 'patricia', 'jennifer',
    'margaret', 'kimberly', 'michelle', 'jonathan', 'elizabeth', 'stephanie', 'christopher',
]

var lastNames = [
    'li', 'lee', 'wang', 'berg', 'musa', 'tamm', 'park', 'moore', 'brown', 'nowak',
    'meyer', 'lopez', 'smith', 'monet', 'akbas', 'novak', 'taylor', 'gracia', 'hansen',
    'melnyk', 'almeida', 'ibrahim', 'lavigne', 'adamcik', 'seatang', 'albescu', 'williams',
    'kowalska', 'einstein', 'pedersen', 'andersson'
]

let titles = [
    'cold', 'wind', 'forgotten', 'hateful', 'great', 'greedy', 'slayer', 'grumpy', 'sleepy'
]

let locations = [
    'sidney', 'berlin', 'paris', 'london', 'madrid', 'beijing', 'tallinn', 'stockholm',
    'abuja', 'brasilia', 'rome', 'bukarest',
]


/**
 * Get a random element from a list depending on the difficulty setting. The higher the difficulty is the more likely
 * it is to return an element that is closer to the end of the array
 * @param difficulty {int}
 * @param data {array}
 * @returns {string} - random element from data depending on the difficulty
 */
function selectByDifficulty(difficulty, data){

    let window = Math.floor(data.length / 3)
    difficulty = Math.max(Math.min(difficulty-5, window * 2) - 1, 0)
    return data[randInt(difficulty, window + difficulty)]
}

/**
 * Generate the name of an enemy
 * @param difficulty {int}
 * @returns {string}
 */
export function generateNameByDifficulty(difficulty){
    let firstName = selectByDifficulty(difficulty, firstNames)
    let lastName = selectByDifficulty(difficulty, lastNames)

    let name = firstName + ' ' + lastName

    if(difficulty > 5 && Math.random() > 0.6){
        name += ' the ' + selectByDifficulty(difficulty, titles)
    }
    else if(difficulty > 10 && Math.random() > 0.7){
        name += ' from ' + selectByDifficulty(difficulty, locations)
    }

    return name
}